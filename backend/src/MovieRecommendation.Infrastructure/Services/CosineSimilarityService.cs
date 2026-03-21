using MovieRecommendation.Domain.Services;

namespace MovieRecommendation.Infrastructure.Services;

/// <summary>
/// Computes cosine similarity between rating vectors for user-based collaborative filtering.
/// </summary>
/// <remarks>
/// Cosine similarity measures the angle between two vectors in an n-dimensional space.
/// The formula is:
/// <para>
///   similarity(A, B) = (A · B) / (‖A‖ · ‖B‖)
/// </para>
/// where A · B is the dot product and ‖A‖, ‖B‖ are the Euclidean norms (L2 norms) of the vectors.
/// A result of 1.0 indicates identical direction (perfect similarity), 0.0 indicates orthogonality
/// (no similarity), and -1.0 indicates opposite direction.
/// In the context of rating vectors, values typically fall in [0, 1] because ratings are non-negative.
/// </remarks>
public sealed class CosineSimilarityService : ICosineSimilarityService
{
    /// <summary>
    /// Computes the cosine similarity between two rating vectors.
    /// </summary>
    /// <param name="vectorA">The first rating vector.</param>
    /// <param name="vectorB">The second rating vector. Must have the same length as <paramref name="vectorA"/>.</param>
    /// <returns>
    /// A value in [-1.0, 1.0] representing the cosine similarity.
    /// Returns 0.0 if either vector has a zero norm (all-zero entries), since similarity is undefined in that case.
    /// </returns>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="vectorA"/> and <paramref name="vectorB"/> have different lengths.
    /// </exception>
    /// <remarks>
    /// The dot product is computed as the sum of element-wise products.
    /// Each norm is the square root of the sum of squared elements.
    /// A zero-norm vector corresponds to a user who has rated no movies in common with the dataset structure,
    /// making similarity undefined; the method returns 0.0 in that case to avoid division by zero.
    /// </remarks>
    public double ComputeSimilarity(double[] vectorA, double[] vectorB)
    {
        if (vectorA.Length != vectorB.Length)
        {
            throw new ArgumentException(
                $"Vector dimensions must match. Got {vectorA.Length} and {vectorB.Length}.");
        }

        double dotProduct = 0.0;
        double normA = 0.0;
        double normB = 0.0;

        for (int i = 0; i < vectorA.Length; i++)
        {
            dotProduct += vectorA[i] * vectorB[i];
            normA += vectorA[i] * vectorA[i];
            normB += vectorB[i] * vectorB[i];
        }

        normA = Math.Sqrt(normA);
        normB = Math.Sqrt(normB);

        if (normA == 0.0 || normB == 0.0)
        {
            return 0.0;
        }

        return dotProduct / (normA * normB);
    }

    /// <summary>
    /// Builds a square similarity matrix from a user-movie rating matrix.
    /// </summary>
    /// <param name="ratingMatrix">
    /// A 2-dimensional array of shape [users × movies] where entry [i, j] is the rating
    /// user i gave to movie j. A value of 0 indicates no rating was submitted.
    /// </param>
    /// <returns>
    /// A square matrix of shape [users × users] where entry [i, j] contains the cosine
    /// similarity between the rating vectors of user i and user j.
    /// The diagonal is always 1.0 (a user is perfectly similar to themselves).
    /// The matrix is symmetric: similarity[i, j] == similarity[j, i].
    /// </returns>
    /// <remarks>
    /// For each ordered pair (i, j) of user indices the method extracts the corresponding
    /// rows from <paramref name="ratingMatrix"/> as one-dimensional arrays and delegates
    /// to <see cref="ComputeSimilarity"/> to obtain the pairwise value.
    /// Extracting both halves of the symmetric matrix allows the inner loop to start at
    /// index 0 each time, keeping the logic straightforward at the cost of redundant computation.
    /// </remarks>
    public double[,] BuildUserSimilarityMatrix(double[,] ratingMatrix)
    {
        int userCount = ratingMatrix.GetLength(0);
        int movieCount = ratingMatrix.GetLength(1);
        double[,] similarityMatrix = new double[userCount, userCount];

        for (int i = 0; i < userCount; i++)
        {
            double[] rowI = ExtractRow(ratingMatrix, i, movieCount);

            for (int j = 0; j < userCount; j++)
            {
                double[] rowJ = ExtractRow(ratingMatrix, j, movieCount);
                similarityMatrix[i, j] = ComputeSimilarity(rowI, rowJ);
            }
        }

        return similarityMatrix;
    }

    /// <summary>
    /// Extracts a single row from a two-dimensional array as a one-dimensional array.
    /// </summary>
    /// <param name="matrix">The source matrix.</param>
    /// <param name="rowIndex">The zero-based index of the row to extract.</param>
    /// <param name="columnCount">The number of columns in the matrix.</param>
    /// <returns>A new array containing the values from the specified row.</returns>
    private static double[] ExtractRow(double[,] matrix, int rowIndex, int columnCount)
    {
        double[] row = new double[columnCount];

        for (int col = 0; col < columnCount; col++)
        {
            row[col] = matrix[rowIndex, col];
        }

        return row;
    }
}
