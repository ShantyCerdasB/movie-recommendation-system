using MovieRecommendation.Domain.Entities;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of <see cref="IUserRepository"/>.
/// </summary>
/// <remarks>
/// This implementation stores the user list in a private <see cref="List{T}"/> that is
/// initialised once from the sequence supplied at construction time. It is intended for
/// academic and demonstration use where a persistent data store is not required.
/// </remarks>
public sealed class UserRepository : IUserRepository
{
    private readonly List<User> _users;

    /// <summary>
    /// Initialises a new instance of <see cref="UserRepository"/> with a pre-seeded collection.
    /// </summary>
    /// <param name="users">
    /// The initial set of users to populate the repository.
    /// The sequence is copied into an internal list so that later changes to the source do not
    /// affect the repository state.
    /// </param>
    public UserRepository(IEnumerable<User> users)
    {
        _users = users.ToList();
    }

    /// <summary>
    /// Retrieves all users in the repository.
    /// </summary>
    /// <returns>
    /// A completed task whose result is a read-only list containing every user currently stored.
    /// </returns>
    public Task<IReadOnlyList<User>> GetAllAsync()
    {
        IReadOnlyList<User> result = _users.AsReadOnly();
        return Task.FromResult(result);
    }

    /// <summary>
    /// Retrieves a single user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to retrieve.</param>
    /// <returns>
    /// A completed task whose result is the matching <see cref="User"/>, or <c>null</c> if no
    /// user with the specified <paramref name="id"/> exists in the repository.
    /// </returns>
    public Task<User?> GetByIdAsync(Guid id)
    {
        User? user = _users.FirstOrDefault(u => u.Id == id);
        return Task.FromResult(user);
    }
}
