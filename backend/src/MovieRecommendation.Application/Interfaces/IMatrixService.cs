using MovieRecommendation.Application.DTOs;

namespace MovieRecommendation.Application.Interfaces;

/// <summary>
/// Defines application-level operations for exposing the raw linear-algebra
/// matrices used by the recommendation engine.
/// These endpoints are intended for academic visualisation and inspection.
/// </summary>
public interface IMatrixService
{
    /// <summary>
    /// Builds and returns the user-movie rating matrix.
    /// </summary>
    /// <returns>
    /// A task that resolves to a <see cref="MatrixDto"/> where rows correspond to users,
    /// columns correspond to movies, and each cell holds a rating score (1.0–5.0)
    /// or 0 if the user has not rated that movie.
    /// </returns>
    Task<MatrixDto> GetRatingMatrixAsync();

    /// <summary>
    /// Builds the rating matrix and computes the pairwise cosine similarity
    /// between every pair of users.
    /// </summary>
    /// <returns>
    /// A task that resolves to a <see cref="SimilarityDto"/> containing a symmetric
    /// square matrix where entry [i, j] is the cosine similarity between user i
    /// and user j.
    /// </returns>
    Task<SimilarityDto> GetUserSimilarityMatrixAsync();
}
