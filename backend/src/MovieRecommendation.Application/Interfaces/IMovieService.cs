using MovieRecommendation.Application.DTOs;

namespace MovieRecommendation.Application.Interfaces;

/// <summary>
/// Defines application-level operations for querying movies.
/// </summary>
public interface IMovieService
{
    /// <summary>
    /// Retrieves all movies available in the system.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of <see cref="MovieDto"/> objects.
    /// </returns>
    Task<IEnumerable<MovieDto>> GetAllMoviesAsync();

    /// <summary>
    /// Retrieves a single movie by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the movie to retrieve.</param>
    /// <returns>
    /// A task that resolves to the matching <see cref="MovieDto"/>,
    /// or <c>null</c> if no movie with the given <paramref name="id"/> exists.
    /// </returns>
    Task<MovieDto?> GetMovieByIdAsync(Guid id);
}
