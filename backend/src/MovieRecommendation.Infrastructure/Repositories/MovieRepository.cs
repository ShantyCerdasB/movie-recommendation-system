using MovieRecommendation.Domain.Entities;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of <see cref="IMovieRepository"/>.
/// </summary>
/// <remarks>
/// This implementation stores the movie catalogue in a private <see cref="List{T}"/> that is
/// initialised once from the sequence supplied at construction time. It is intended for
/// academic and demonstration use where a persistent data store is not required.
/// </remarks>
public sealed class MovieRepository : IMovieRepository
{
    private readonly List<Movie> _movies;

    /// <summary>
    /// Initialises a new instance of <see cref="MovieRepository"/> with a pre-seeded collection.
    /// </summary>
    /// <param name="movies">
    /// The initial set of movies to populate the repository.
    /// The sequence is copied into an internal list so that later changes to the source do not
    /// affect the repository state.
    /// </param>
    public MovieRepository(IEnumerable<Movie> movies)
    {
        _movies = movies.ToList();
    }

    /// <summary>
    /// Retrieves all movies in the repository.
    /// </summary>
    /// <returns>
    /// A completed task whose result is a read-only list containing every movie currently stored.
    /// </returns>
    public Task<IReadOnlyList<Movie>> GetAllAsync()
    {
        IReadOnlyList<Movie> result = _movies.AsReadOnly();
        return Task.FromResult(result);
    }

    /// <summary>
    /// Retrieves a single movie by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the movie to retrieve.</param>
    /// <returns>
    /// A completed task whose result is the matching <see cref="Movie"/>, or <c>null</c> if no
    /// movie with the specified <paramref name="id"/> exists in the repository.
    /// </returns>
    public Task<Movie?> GetByIdAsync(Guid id)
    {
        Movie? movie = _movies.FirstOrDefault(m => m.Id == id);
        return Task.FromResult(movie);
    }
}
