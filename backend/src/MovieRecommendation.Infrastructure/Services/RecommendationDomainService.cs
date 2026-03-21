using MovieRecommendation.Domain.Entities;
using MovieRecommendation.Domain.Services;

namespace MovieRecommendation.Infrastructure.Services;

/// <summary>
/// Generates movie recommendations for a target user using user-based collaborative filtering
/// with cosine similarity as the neighbourhood metric.
/// </summary>
/// <remarks>
/// The algorithm follows these steps:
/// <list type="number">
///   <item>Map each user and each movie to a numeric index.</item>
///   <item>Construct a user-movie rating matrix R where R[u, m] is the rating user u gave movie m (0 if none).</item>
///   <item>Compute the cosine similarity between the target user's rating vector and every other user's vector.</item>
///   <item>For each movie the target user has not yet rated, predict a score using a weighted average
///         of the ratings submitted by similar users.</item>
///   <item>Return the top-N predictions ordered by descending predicted score.</item>
/// </list>
/// </remarks>
public sealed class RecommendationDomainService : IRecommendationDomainService
{
    private readonly ICosineSimilarityService _cosineSimilarityService;

    /// <summary>
    /// Initialises a new instance of <see cref="RecommendationDomainService"/>.
    /// </summary>
    /// <param name="cosineSimilarityService">
    /// The service used to compute cosine similarity between user rating vectors.
    /// </param>
    public RecommendationDomainService(ICosineSimilarityService cosineSimilarityService)
    {
        _cosineSimilarityService = cosineSimilarityService;
    }

    /// <summary>
    /// Generates movie recommendations for a target user.
    /// </summary>
    /// <param name="targetUserId">The unique identifier of the user for whom recommendations are generated.</param>
    /// <param name="users">The full list of users in the system.</param>
    /// <param name="movies">The full list of movies available in the catalogue.</param>
    /// <param name="ratings">All ratings recorded in the system.</param>
    /// <param name="topN">The maximum number of recommendations to return.</param>
    /// <returns>
    /// An ordered list of <see cref="RecommendationResult"/> instances, sorted by
    /// <see cref="RecommendationResult.PredictedScore"/> descending, containing at most
    /// <paramref name="topN"/> entries. Only movies with at least one positively similar
    /// neighbour are included.
    /// </returns>
    /// <remarks>
    /// The predicted score for movie m and target user t is computed as:
    /// <para>
    ///   score(t, m) = Σ [ sim(t, u) × R[u, m] ] / Σ |sim(t, u)|
    /// </para>
    /// where the sums run over all other users u who have rated movie m and for whom
    /// sim(t, u) &gt; 0. This is the standard similarity-weighted average used in
    /// user-based collaborative filtering.
    /// </remarks>
    public IEnumerable<RecommendationResult> GenerateRecommendations(
        Guid targetUserId,
        IEnumerable<User> users,
        IEnumerable<Movie> movies,
        IEnumerable<Rating> ratings,
        int topN = 5)
    {
        // Step 1: Materialise enumerables once to allow multiple passes and index access.
        var userList  = users.ToList();
        var movieList = movies.ToList();
        var ratingList = ratings.ToList();

        Dictionary<Guid, int> userIndex  = BuildIndex(userList.Select(u => u.Id));
        Dictionary<Guid, int> movieIndex = BuildIndex(movieList.Select(m => m.Id));

        int userCount  = userList.Count;
        int movieCount = movieList.Count;

        // Step 2: Populate the user-movie rating matrix.
        double[,] ratingMatrix = BuildRatingMatrix(ratingList, userIndex, movieIndex, userCount, movieCount);

        // Step 3: Locate the target user's row.
        int targetRow = userIndex[targetUserId];

        // Step 4: Compute cosine similarity between the target user and every other user.
        double[] similarities = ComputeUserSimilarities(ratingMatrix, targetRow, userCount, movieCount);

        // Identify which movies the target user has already rated so they are excluded.
        HashSet<int> ratedByTarget = GetRatedMovieIndices(ratingMatrix, targetRow, movieCount);

        // Step 5 & 6: Predict scores for unrated movies using weighted averages.
        List<RecommendationResult> results = new();

        for (int movieCol = 0; movieCol < movieCount; movieCol++)
        {
            if (ratedByTarget.Contains(movieCol))
            {
                continue;
            }

            double weightedRatingSum = 0.0;
            double similarityAbsSum = 0.0;
            int contributorCount = 0;
            double totalSimilarityForAvg = 0.0;

            for (int userRow = 0; userRow < userCount; userRow++)
            {
                if (userRow == targetRow)
                {
                    continue;
                }

                double sim = similarities[userRow];
                double rating = ratingMatrix[userRow, movieCol];

                if (sim > 0.0 && rating > 0.0)
                {
                    weightedRatingSum += sim * rating;
                    similarityAbsSum += Math.Abs(sim);
                    contributorCount++;
                    totalSimilarityForAvg += sim;
                }
            }

            if (contributorCount == 0)
            {
                continue;
            }

            double predictedScore = weightedRatingSum / similarityAbsSum;
            double averageSimilarity = totalSimilarityForAvg / contributorCount;
            Movie movie = movieList[movieCol];

            string explanation = BuildExplanation(contributorCount, averageSimilarity);

            results.Add(new RecommendationResult(
                movieId:         movie.Id,
                movieTitle:      movie.Title,
                predictedScore:  predictedScore,
                similarityWeight: similarityAbsSum,
                explanation:     explanation));
        }

        // Step 7: Return top-N results ordered by descending predicted score.
        return results
            .OrderByDescending(r => r.PredictedScore)
            .Take(topN)
            .ToList()
            .AsReadOnly();
    }

    /// <summary>
    /// Creates a dictionary mapping each identifier to a sequential zero-based index.
    /// </summary>
    /// <param name="ids">The sequence of identifiers to index.</param>
    /// <returns>A dictionary where each key maps to a unique row or column position.</returns>
    private static Dictionary<Guid, int> BuildIndex(IEnumerable<Guid> ids)
    {
        Dictionary<Guid, int> index = new();
        int position = 0;

        foreach (Guid id in ids)
        {
            index[id] = position++;
        }

        return index;
    }

    /// <summary>
    /// Constructs the user-movie rating matrix from the flat list of rating records.
    /// </summary>
    /// <param name="ratings">All rating records.</param>
    /// <param name="userIndex">Map from user identifier to row index.</param>
    /// <param name="movieIndex">Map from movie identifier to column index.</param>
    /// <param name="userCount">Total number of users (number of rows).</param>
    /// <param name="movieCount">Total number of movies (number of columns).</param>
    /// <returns>A [userCount × movieCount] matrix initialised with 0.0 for missing ratings.</returns>
    private static double[,] BuildRatingMatrix(
        List<Rating> ratings,
        Dictionary<Guid, int> userIndex,
        Dictionary<Guid, int> movieIndex,
        int userCount,
        int movieCount)
    {
        double[,] matrix = new double[userCount, movieCount];

        foreach (Rating rating in ratings)
        {
            if (userIndex.TryGetValue(rating.UserId, out int row) &&
                movieIndex.TryGetValue(rating.MovieId, out int col))
            {
                matrix[row, col] = rating.Score;
            }
        }

        return matrix;
    }

    /// <summary>
    /// Computes the cosine similarity between the target user and every other user.
    /// </summary>
    /// <param name="ratingMatrix">The full user-movie rating matrix.</param>
    /// <param name="targetRow">The row index of the target user.</param>
    /// <param name="userCount">Total number of users.</param>
    /// <param name="movieCount">Total number of movies (length of each rating vector).</param>
    /// <returns>
    /// An array of length <paramref name="userCount"/> where position u contains the
    /// cosine similarity between the target user and user u. The entry at
    /// <paramref name="targetRow"/> is set to 0.0 and is never used in predictions.
    /// </returns>
    private double[] ComputeUserSimilarities(
        double[,] ratingMatrix,
        int targetRow,
        int userCount,
        int movieCount)
    {
        double[] targetVector = ExtractRow(ratingMatrix, targetRow, movieCount);
        double[] similarities = new double[userCount];

        for (int u = 0; u < userCount; u++)
        {
            if (u == targetRow)
            {
                similarities[u] = 0.0;
                continue;
            }

            double[] otherVector = ExtractRow(ratingMatrix, u, movieCount);
            similarities[u] = _cosineSimilarityService.ComputeSimilarity(targetVector, otherVector);
        }

        return similarities;
    }

    /// <summary>
    /// Returns the set of column indices for movies that the target user has already rated.
    /// </summary>
    /// <param name="ratingMatrix">The full user-movie rating matrix.</param>
    /// <param name="targetRow">The row index of the target user.</param>
    /// <param name="movieCount">Total number of movies.</param>
    /// <returns>A hash set of column indices where the target user's rating is greater than zero.</returns>
    private static HashSet<int> GetRatedMovieIndices(double[,] ratingMatrix, int targetRow, int movieCount)
    {
        HashSet<int> rated = new();

        for (int col = 0; col < movieCount; col++)
        {
            if (ratingMatrix[targetRow, col] > 0.0)
            {
                rated.Add(col);
            }
        }

        return rated;
    }

    /// <summary>
    /// Extracts a row from a two-dimensional matrix as a one-dimensional array.
    /// </summary>
    /// <param name="matrix">The source matrix.</param>
    /// <param name="rowIndex">Zero-based row index.</param>
    /// <param name="columnCount">Number of columns in the matrix.</param>
    /// <returns>A new array containing the row values.</returns>
    private static double[] ExtractRow(double[,] matrix, int rowIndex, int columnCount)
    {
        double[] row = new double[columnCount];

        for (int col = 0; col < columnCount; col++)
        {
            row[col] = matrix[rowIndex, col];
        }

        return row;
    }

    /// <summary>
    /// Builds a human-readable explanation string describing the basis for a recommendation.
    /// </summary>
    /// <param name="contributorCount">The number of similar users who contributed ratings.</param>
    /// <param name="averageSimilarity">The mean cosine similarity of the contributing users.</param>
    /// <returns>A formatted explanation string suitable for display in the API response.</returns>
    private static string BuildExplanation(int contributorCount, double averageSimilarity)
    {
        return $"Recommended based on ratings from {contributorCount} similar " +
               $"{(contributorCount == 1 ? "user" : "users")} " +
               $"(avg. similarity: {averageSimilarity:F2})";
    }
}
