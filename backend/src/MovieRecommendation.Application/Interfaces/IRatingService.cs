using MovieRecommendation.Application.DTOs;

namespace MovieRecommendation.Application.Interfaces;

/// <summary>
/// Defines application-level operations for managing movie ratings.
/// </summary>
public interface IRatingService
{
    /// <summary>
    /// Retrieves all ratings recorded in the system.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of <see cref="RatingDto"/> objects.
    /// </returns>
    Task<IEnumerable<RatingDto>> GetAllRatingsAsync();

    /// <summary>
    /// Retrieves all ratings submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user whose ratings are requested.</param>
    /// <returns>
    /// A task that resolves to an enumerable collection of <see cref="RatingDto"/> objects
    /// belonging to the specified user.
    /// </returns>
    Task<IEnumerable<RatingDto>> GetRatingsByUserAsync(Guid userId);

    /// <summary>
    /// Creates and persists a new rating from the supplied transfer object.
    /// </summary>
    /// <param name="dto">
    /// A <see cref="CreateRatingDto"/> carrying the user identifier, movie identifier,
    /// and the numeric score to record.
    /// </param>
    /// <returns>A task representing the asynchronous create operation.</returns>
    Task CreateRatingAsync(CreateRatingDto dto);
}
