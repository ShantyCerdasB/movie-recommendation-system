namespace MovieRecommendation.Domain.Exceptions;

/// <summary>
/// Thrown when a requested user does not exist in the data source.
/// </summary>
public sealed class UserNotFoundException : DomainException
{
    /// <summary>Gets the identifier of the user that could not be found.</summary>
    public Guid UserId { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="UserNotFoundException"/> class.
    /// </summary>
    /// <param name="userId">The identifier of the user that was not found.</param>
    public UserNotFoundException(Guid userId)
        : base($"User with id {userId} was not found.")
    {
        UserId = userId;
    }
}
