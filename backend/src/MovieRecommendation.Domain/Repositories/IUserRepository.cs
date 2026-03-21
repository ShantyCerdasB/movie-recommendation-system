using MovieRecommendation.Domain.Entities;

namespace MovieRecommendation.Domain.Repositories;

/// <summary>
/// Defines data-access operations for <see cref="User"/> entities.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Retrieves all users stored in the data source.
    /// </summary>
    /// <returns>
    /// A task that resolves to an enumerable collection of all <see cref="User"/> entities.
    /// </returns>
    Task<IReadOnlyList<User>> GetAllAsync();

    /// <summary>
    /// Retrieves a single user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user to retrieve.</param>
    /// <returns>
    /// A task that resolves to the matching <see cref="User"/>,
    /// or <c>null</c> if no user with the given <paramref name="id"/> exists.
    /// </returns>
    Task<User?> GetByIdAsync(Guid id);
}
