namespace MovieRecommendation.Domain.Services;

/// <summary>
/// Contract for cosine similarity computation between rating vectors.
/// </summary>
/// <remarks>
/// Cosine similarity between two vectors A and B is defined as:
/// <code>
///   cos(θ) = (A · B) / (‖A‖ * ‖B‖)
/// </code>
/// where A · B is the dot product and ‖·‖ denotes the Euclidean norm.
/// The result lies in [-1, 1]; for non-negative rating vectors it lies in [0, 1].
/// </remarks>
public interface ICosineSimilarityService
{
    /// <summary>
    /// Computes the cosine similarity between two rating vectors.
    /// </summary>
    /// <param name="vectorA">The first rating vector.</param>
    /// <param name="vectorB">The second rating vector.</param>
    /// <returns>
    /// A scalar in [0, 1] representing the cosine similarity between the two vectors.
    /// Returns 0 when either vector is the zero vector (no ratings in common).
    /// </returns>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="vectorA"/> and <paramref name="vectorB"/>
    /// have different lengths.
    /// </exception>
    double ComputeSimilarity(double[] vectorA, double[] vectorB);

    /// <summary>
    /// Builds a symmetric user-similarity matrix using cosine similarity.
    /// </summary>
    /// <param name="ratingMatrix">
    /// A two-dimensional matrix of shape [users, movies] where each entry is the
    /// rating given by a user to a movie, or 0 if the user has not rated that movie.
    /// </param>
    /// <returns>
    /// A symmetric square matrix of shape [users, users] where entry [i, j] holds
    /// the cosine similarity between user i's rating vector and user j's rating vector.
    /// Diagonal entries are 1 (each user is perfectly similar to themselves).
    /// </returns>
    double[,] BuildUserSimilarityMatrix(double[,] ratingMatrix);
}
