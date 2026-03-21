using MovieRecommendation.Application.DTOs;

namespace MovieRecommendation.Application.Interfaces;

/// <summary>
/// Defines application-level operations for querying users.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Retrieves all users registered in the system.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of <see cref="UserDto"/> objects.
    /// </returns>
    Task<IEnumerable<UserDto>> GetAllUsersAsync();

    /// <summary>
    /// Retrieves a single user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to retrieve.</param>
    /// <returns>
    /// A task that resolves to the matching <see cref="UserDto"/>,
    /// or <c>null</c> if no user with the given <paramref name="id"/> exists.
    /// </returns>
    Task<UserDto?> GetUserByIdAsync(Guid id);
}
