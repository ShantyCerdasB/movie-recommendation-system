using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Application.Services;

/// <summary>
/// Application service that handles movie query use-cases by delegating
/// data retrieval to <see cref="IMovieRepository"/> and projecting domain
/// entities onto <see cref="MovieDto"/> objects.
/// </summary>
public sealed class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="MovieService"/> class.
    /// </summary>
    /// <param name="movieRepository">
    /// The repository used to retrieve <c>Movie</c> domain entities.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="movieRepository"/> is <c>null</c>.
    /// </exception>
    public MovieService(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository
            ?? throw new ArgumentNullException(nameof(movieRepository));
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<MovieDto>> GetAllMoviesAsync()
    {
        var movies = await _movieRepository.GetAllAsync();

        return movies.Select(m => new MovieDto(
            m.Id,
            m.Title,
            m.Genre,
            m.ReleaseYear,
            m.PosterUrl,
            m.Description));
    }

    /// <inheritdoc/>
    public async Task<MovieDto?> GetMovieByIdAsync(Guid id)
    {
        var movie = await _movieRepository.GetByIdAsync(id);

        if (movie is null)
            return null;

        return new MovieDto(
            movie.Id,
            movie.Title,
            movie.Genre,
            movie.ReleaseYear,
            movie.PosterUrl,
            movie.Description);
    }
}
