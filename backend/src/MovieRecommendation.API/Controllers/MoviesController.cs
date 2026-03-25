using Microsoft.AspNetCore.Mvc;
using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;

namespace MovieRecommendation.API.Controllers;

/// <summary>
/// Exposes read-only endpoints for the movie catalogue.
/// </summary>
[ApiController]
[Route("v1/[controller]")]
public sealed class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    /// <summary>
    /// Initialises a new instance of <see cref="MoviesController"/>.
    /// </summary>
    /// <param name="movieService">The application service used to query the movie catalogue.</param>
    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    /// <summary>
    /// Returns the full list of movies available in the catalogue.
    /// </summary>
    /// <returns>
    /// <c>200 OK</c> with a JSON array of <see cref="MovieDto"/> objects.
    /// </returns>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<MovieDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        IEnumerable<MovieDto> movies = await _movieService.GetAllMoviesAsync();
        return Ok(movies);
    }

    /// <summary>
    /// Returns a single movie identified by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the movie to retrieve.</param>
    /// <returns>
    /// <c>200 OK</c> with the matching <see cref="MovieDto"/>, or
    /// <c>404 Not Found</c> if no movie with the specified <paramref name="id"/> exists.
    /// </returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(MovieDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        MovieDto? movie = await _movieService.GetMovieByIdAsync(id);

        if (movie is null)
        {
            return NotFound();
        }

        return Ok(movie);
    }
}
