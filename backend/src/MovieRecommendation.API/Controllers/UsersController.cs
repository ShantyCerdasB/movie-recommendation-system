using Microsoft.AspNetCore.Mvc;
using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;

namespace MovieRecommendation.API.Controllers;

/// <summary>
/// Exposes read-only endpoints for the registered user list.
/// </summary>
[ApiController]
[Route("v1/[controller]")]
public sealed class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    /// <summary>
    /// Initialises a new instance of <see cref="UsersController"/>.
    /// </summary>
    /// <param name="userService">The application service used to query user data.</param>
    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Returns the full list of registered users.
    /// </summary>
    /// <returns>
    /// <c>200 OK</c> with a JSON array of <see cref="UserDto"/> objects.
    /// </returns>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<UserDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        IEnumerable<UserDto> users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }

    /// <summary>
    /// Returns a single user identified by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to retrieve.</param>
    /// <returns>
    /// <c>200 OK</c> with the matching <see cref="UserDto"/>, or
    /// <c>404 Not Found</c> if no user with the specified <paramref name="id"/> exists.
    /// </returns>
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(Guid id)
    {
        UserDto? user = await _userService.GetUserByIdAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        return Ok(user);
    }
}
