using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Repositories;
using MovieRecommendation.Domain.Services;

namespace MovieRecommendation.Application.Services;

/// <summary>
/// Application service that constructs and exposes the raw linear-algebra matrices
/// used by the recommendation engine, enabling academic visualisation and inspection
/// of the underlying data structures.
/// </summary>
public sealed class MatrixService : IMatrixService
{
    private readonly IUserRepository          _userRepository;
    private readonly IMovieRepository         _movieRepository;
    private readonly IRatingRepository        _ratingRepository;
    private readonly ICosineSimilarityService _cosineSimilarityService;

    /// <summary>
    /// Initializes a new instance of the <see cref="MatrixService"/> class.
    /// </summary>
    /// <param name="userRepository">Repository used to fetch all users.</param>
    /// <param name="movieRepository">Repository used to fetch all movies.</param>
    /// <param name="ratingRepository">Repository used to fetch all ratings.</param>
    /// <param name="cosineSimilarityService">
    /// Service used to compute the cosine similarity matrix from the rating matrix.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when any of the supplied dependencies is <c>null</c>.
    /// </exception>
    public MatrixService(
        IUserRepository          userRepository,
        IMovieRepository         movieRepository,
        IRatingRepository        ratingRepository,
        ICosineSimilarityService cosineSimilarityService)
    {
        _userRepository          = userRepository
            ?? throw new ArgumentNullException(nameof(userRepository));
        _movieRepository         = movieRepository
            ?? throw new ArgumentNullException(nameof(movieRepository));
        _ratingRepository        = ratingRepository
            ?? throw new ArgumentNullException(nameof(ratingRepository));
        _cosineSimilarityService = cosineSimilarityService
            ?? throw new ArgumentNullException(nameof(cosineSimilarityService));
    }

    /// <inheritdoc/>
    /// <remarks>
    /// Users and movies are sorted by their string identifiers to produce a
    /// deterministic matrix layout across requests.
    /// </remarks>
    public async Task<MatrixDto> GetRatingMatrixAsync()
    {
        var (users, movies, ratings) = await FetchAllDataAsync();

        var ratingMatrix2D = BuildRatingMatrix(users, movies, ratings,
            out var userNames, out var movieTitles);

        return new MatrixDto
        {
            UserNames   = userNames,
            MovieTitles = movieTitles,
            Ratings     = ToJagged(ratingMatrix2D, users.Count, movies.Count)
        };
    }

    /// <inheritdoc/>
    public async Task<SimilarityDto> GetUserSimilarityMatrixAsync()
    {
        var (users, movies, ratings) = await FetchAllDataAsync();

        var ratingMatrix2D = BuildRatingMatrix(users, movies, ratings,
            out var userNames, out _);

        var similarityMatrix2D = _cosineSimilarityService.BuildUserSimilarityMatrix(ratingMatrix2D);

        return new SimilarityDto
        {
            UserNames    = userNames,
            Similarities = ToJagged(similarityMatrix2D, users.Count, users.Count)
        };
    }

    // ---------------------------------------------------------------------------
    // Private helpers
    // ---------------------------------------------------------------------------

    /// <summary>
    /// Fetches users, movies, and ratings from their respective repositories in
    /// parallel and returns them as a value tuple.
    /// </summary>
    private async Task<(
        IReadOnlyList<Domain.Entities.User>   Users,
        IReadOnlyList<Domain.Entities.Movie>  Movies,
        IReadOnlyList<Domain.Entities.Rating> Ratings)> FetchAllDataAsync()
    {
        var usersTask   = _userRepository.GetAllAsync();
        var moviesTask  = _movieRepository.GetAllAsync();
        var ratingsTask = _ratingRepository.GetAllAsync();

        await Task.WhenAll(usersTask, moviesTask, ratingsTask);

        return (
            (await usersTask).OrderBy(u => u.Id.ToString()).ToList(),
            (await moviesTask).OrderBy(m => m.Id.ToString()).ToList(),
            (await ratingsTask).ToList()
        );
    }

    /// <summary>
    /// Constructs the user-movie rating matrix from the supplied collections.
    /// </summary>
    /// <param name="users">The ordered list of users (defines row order).</param>
    /// <param name="movies">The ordered list of movies (defines column order).</param>
    /// <param name="ratings">All recorded ratings.</param>
    /// <param name="userNames">
    /// Output parameter: the ordered array of user display names labelling the rows.
    /// </param>
    /// <param name="movieTitles">
    /// Output parameter: the ordered array of movie titles labelling the columns.
    /// </param>
    /// <returns>
    /// A two-dimensional array of shape [users, movies] where each entry is the rating
    /// score (1.0–5.0) or 0 when the user has not rated the corresponding movie.
    /// </returns>
    private static double[,] BuildRatingMatrix(
        IReadOnlyList<Domain.Entities.User>   users,
        IReadOnlyList<Domain.Entities.Movie>  movies,
        IReadOnlyList<Domain.Entities.Rating> ratings,
        out string[]                          userNames,
        out string[]                          movieTitles)
    {
        // Build index lookup tables for O(1) row/column access.
        var userIndex  = users.Select((u, i) => (u.Id, i))
                              .ToDictionary(x => x.Id, x => x.i);
        var movieIndex = movies.Select((m, i) => (m.Id, i))
                               .ToDictionary(x => x.Id, x => x.i);

        var matrix = new double[users.Count, movies.Count];

        foreach (var rating in ratings)
        {
            if (userIndex.TryGetValue(rating.UserId, out int row)
                && movieIndex.TryGetValue(rating.MovieId, out int col))
            {
                matrix[row, col] = rating.Score;
            }
        }

        userNames   = users.Select(u => u.Name).ToArray();
        movieTitles = movies.Select(m => m.Title).ToArray();

        return matrix;
    }

    /// <summary>
    /// Converts a rectangular two-dimensional array to a jagged array for JSON serialisation.
    /// </summary>
    /// <param name="source">The source two-dimensional array.</param>
    /// <param name="rows">Number of rows.</param>
    /// <param name="cols">Number of columns.</param>
    /// <returns>A jagged <c>double[][]</c> with the same values as the source.</returns>
    private static double[][] ToJagged(double[,] source, int rows, int cols)
    {
        var jagged = new double[rows][];
        for (int r = 0; r < rows; r++)
        {
            jagged[r] = new double[cols];
            for (int c = 0; c < cols; c++)
            {
                jagged[r][c] = source[r, c];
            }
        }
        return jagged;
    }
}
