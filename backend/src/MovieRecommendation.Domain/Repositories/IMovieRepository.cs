using MovieRecommendation.Domain.Entities;

namespace MovieRecommendation.Domain.Repositories;

/// <summary>
/// Defines data-access operations for <see cref="Movie"/> entities.
/// </summary>
public interface IMovieRepository
{
    /// <summary>
    /// Retrieves all movies stored in the data source.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of all <see cref="Movie"/> entities.
    /// </returns>
    Task<IReadOnlyList<Movie>> GetAllAsync();

    /// <summary>
    /// Retrieves a single movie by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the movie to retrieve.</param>
    /// <returns>
    /// A task that resolves to the matching <see cref="Movie"/>,
    /// or <c>null</c> if no movie with the given <paramref name="id"/> exists.
    /// </returns>
    Task<Movie?> GetByIdAsync(Guid id);
}
