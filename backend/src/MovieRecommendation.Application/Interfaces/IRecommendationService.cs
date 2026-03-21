using MovieRecommendation.Application.DTOs;

namespace MovieRecommendation.Application.Interfaces;

/// <summary>
/// Defines the application-level entry point for generating movie recommendations.
/// </summary>
public interface IRecommendationService
{
    /// <summary>
    /// Generates a ranked list of movie recommendations for the specified user
    /// using cosine-similarity-based collaborative filtering.
    /// </summary>
    /// <param name="userId">The unique identifier of the target user.</param>
    /// <param name="topN">
    /// The maximum number of recommendations to return. Defaults to 5.
    /// </param>
    /// <returns>
    /// A task that resolves to an ordered enumerable of <see cref="RecommendationDto"/>
    /// objects sorted by predicted score descending.
    /// </returns>
    Task<IEnumerable<RecommendationDto>> GetRecommendationsAsync(Guid userId, int topN = 5);
}
