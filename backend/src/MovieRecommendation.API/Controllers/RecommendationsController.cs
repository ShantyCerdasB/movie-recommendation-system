using Microsoft.AspNetCore.Mvc;
using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Exceptions;

namespace MovieRecommendation.API.Controllers;

/// <summary>
/// Exposes the collaborative filtering recommendation engine as an HTTP endpoint.
/// </summary>
[ApiController]
[Route("v1/[controller]")]
public sealed class RecommendationsController : ControllerBase
{
    private readonly IRecommendationService _recommendationService;

    /// <summary>
    /// Initialises a new instance of <see cref="RecommendationsController"/>.
    /// </summary>
    /// <param name="recommendationService">
    /// The application service that orchestrates the recommendation pipeline.
    /// </param>
    public RecommendationsController(IRecommendationService recommendationService)
    {
        _recommendationService = recommendationService;
    }

    /// <summary>
    /// Generates personalised movie recommendations for the specified user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user requesting recommendations.</param>
    /// <param name="topN">
    /// The maximum number of recommendations to return. Defaults to <c>5</c>.
    /// Must be a positive integer.
    /// </param>
    /// <returns>
    /// <c>200 OK</c> with a JSON array of <see cref="RecommendationDto"/> objects ordered
    /// by predicted score descending, or <c>404 Not Found</c> if no user exists with the
    /// given <paramref name="userId"/>.
    /// </returns>
    /// <remarks>
    /// Recommendations are generated using user-based collaborative filtering.
    /// Cosine similarity is computed between the target user's rating vector and every other
    /// user's rating vector. Movies not yet rated by the target user receive a weighted
    /// predicted score based on the ratings of the most similar neighbours.
    /// </remarks>
    [HttpGet("{userId:guid}")]
    [ProducesResponseType(typeof(IEnumerable<RecommendationDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRecommendations(Guid userId, [FromQuery] int topN = 5)
    {
        try
        {
            IEnumerable<RecommendationDto> recommendations =
                await _recommendationService.GetRecommendationsAsync(userId, topN);

            return Ok(recommendations);
        }
        catch (UserNotFoundException)
        {
            return NotFound();
        }
    }
}
