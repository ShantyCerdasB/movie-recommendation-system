using Microsoft.AspNetCore.Mvc;
using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;

namespace MovieRecommendation.API.Controllers;

/// <summary>
/// Exposes the linear algebra data structures computed by the recommendation engine
/// for academic inspection and visualisation.
/// </summary>
[ApiController]
[Route("v1/[controller]")]
public sealed class MatrixController : ControllerBase
{
    private readonly IMatrixService _matrixService;

    /// <summary>
    /// Initialises a new instance of <see cref="MatrixController"/>.
    /// </summary>
    /// <param name="matrixService">
    /// The application service responsible for building and exposing matrix representations.
    /// </param>
    public MatrixController(IMatrixService matrixService)
    {
        _matrixService = matrixService;
    }

    /// <summary>
    /// Returns the user-movie rating matrix where each row represents a user and each column
    /// represents a movie. A value of <c>0</c> indicates that the user has not rated that movie.
    /// </summary>
    /// <returns>
    /// <c>200 OK</c> with a <see cref="MatrixDto"/> containing the rating matrix data,
    /// row labels (user names), and column labels (movie titles).
    /// </returns>
    [HttpGet("ratings")]
    [ProducesResponseType(typeof(MatrixDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetRatingMatrix()
    {
        MatrixDto matrix = await _matrixService.GetRatingMatrixAsync();
        return Ok(matrix);
    }

    /// <summary>
    /// Returns the user-user cosine similarity matrix. Entry [i, j] contains the cosine
    /// similarity between the rating vectors of user i and user j.
    /// </summary>
    /// <returns>
    /// <c>200 OK</c> with a <see cref="SimilarityDto"/> containing the similarity matrix data
    /// and user name labels for both axes.
    /// </returns>
    /// <remarks>
    /// The matrix is symmetric and all diagonal entries are <c>1.0</c>. Values close to
    /// <c>1.0</c> indicate users with very similar rating profiles, while values close to
    /// <c>0.0</c> indicate users who have rated largely different sets of movies or whose
    /// tastes diverge significantly.
    /// </remarks>
    [HttpGet("similarity")]
    [ProducesResponseType(typeof(SimilarityDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSimilarityMatrix()
    {
        SimilarityDto similarity = await _matrixService.GetUserSimilarityMatrixAsync();
        return Ok(similarity);
    }
}
