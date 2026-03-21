using MovieRecommendation.Domain.Entities;

namespace MovieRecommendation.Domain.Repositories;

/// <summary>
/// Defines data-access operations for <see cref="Rating"/> entities.
/// </summary>
public interface IRatingRepository
{
    /// <summary>
    /// Retrieves all ratings stored in the data source.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of all <see cref="Rating"/> entities.
    /// </returns>
    Task<IReadOnlyList<Rating>> GetAllAsync();

    /// <summary>
    /// Retrieves all ratings submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user whose ratings are requested.</param>
    /// <returns>
    /// A task that resolves to an enumerable collection of <see cref="Rating"/> entities
    /// belonging to the specified user.
    /// </returns>
    Task<IReadOnlyList<Rating>> GetByUserIdAsync(Guid userId);

    /// <summary>
    /// Persists a new <see cref="Rating"/> to the data source.
    /// </summary>
    /// <param name="rating">The rating entity to store.</param>
    /// <returns>A task representing the asynchronous write operation.</returns>
    Task AddAsync(Rating rating);

    /// <summary>
    /// Updates an existing <see cref="Rating"/> in the data source.
    /// </summary>
    /// <param name="rating">The rating entity containing the updated values.</param>
    /// <returns>A task representing the asynchronous update operation.</returns>
    Task UpdateAsync(Rating rating);
}
