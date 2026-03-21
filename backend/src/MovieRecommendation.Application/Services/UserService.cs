using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Application.Services;

/// <summary>
/// Application service that handles user query use-cases by delegating
/// data retrieval to <see cref="IUserRepository"/> and projecting domain
/// entities onto <see cref="UserDto"/> objects.
/// </summary>
public sealed class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserService"/> class.
    /// </summary>
    /// <param name="userRepository">
    /// The repository used to retrieve <c>User</c> domain entities.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="userRepository"/> is <c>null</c>.
    /// </exception>
    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository
            ?? throw new ArgumentNullException(nameof(userRepository));
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetAllAsync();

        return users.Select(u => new UserDto(u.Id, u.Name));
    }

    /// <inheritdoc/>
    public async Task<UserDto?> GetUserByIdAsync(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user is null)
            return null;

        return new UserDto(user.Id, user.Name);
    }
}
