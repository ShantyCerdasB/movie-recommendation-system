using Microsoft.AspNetCore.Mvc;
using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;

namespace MovieRecommendation.API.Controllers;

/// <summary>
/// Exposes endpoints for querying and submitting movie ratings.
/// </summary>
[ApiController]
[Route("v1/[controller]")]
public sealed class RatingsController : ControllerBase
{
    private readonly IRatingService _ratingService;

    /// <summary>
    /// Initialises a new instance of <see cref="RatingsController"/>.
    /// </summary>
    /// <param name="ratingService">The application service used to manage rating data.</param>
    public RatingsController(IRatingService ratingService)
    {
        _ratingService = ratingService;
    }

    /// <summary>
    /// Returns all ratings currently stored in the system.
    /// </summary>
    /// <returns>
    /// <c>200 OK</c> with a JSON array of <see cref="RatingDto"/> objects.
    /// </returns>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<RatingDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        IEnumerable<RatingDto> ratings = await _ratingService.GetAllRatingsAsync();
        return Ok(ratings);
    }

    /// <summary>
    /// Returns all ratings submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user whose ratings are requested.</param>
    /// <returns>
    /// <c>200 OK</c> with a JSON array of <see cref="RatingDto"/> objects belonging to the user.
    /// The array is empty if the user has not submitted any ratings.
    /// </returns>
    [HttpGet("user/{userId:guid}")]
    [ProducesResponseType(typeof(IEnumerable<RatingDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(Guid userId)
    {
        IEnumerable<RatingDto> ratings = await _ratingService.GetRatingsByUserAsync(userId);
        return Ok(ratings);
    }

    /// <summary>
    /// Records a new movie rating submitted by a user.
    /// </summary>
    /// <param name="dto">
    /// The rating payload containing the user identifier, movie identifier, and numeric score.
    /// </param>
    /// <returns>
    /// <c>201 Created</c> with the persisted <see cref="RatingDto"/> and a <c>Location</c> header
    /// pointing to the collection endpoint, or <c>400 Bad Request</c> if the payload is invalid.
    /// </returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] CreateRatingDto dto)
    {
        await _ratingService.CreateRatingAsync(dto);
        return StatusCode(StatusCodes.Status201Created);
    }
}
