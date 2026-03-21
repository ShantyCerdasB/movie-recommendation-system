namespace MovieRecommendation.Domain.Entities;

/// <summary>
/// Represents a user who can rate movies and receive recommendations.
/// </summary>
public sealed class User
{
    /// <summary>Gets the unique identifier of the user.</summary>
    public Guid Id { get; private set; }

    /// <summary>Gets the display name of the user.</summary>
    public string Name { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="User"/> class.
    /// </summary>
    /// <param name="id">The unique identifier for the user.</param>
    /// <param name="name">The display name of the user.</param>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="name"/> is null or whitespace.
    /// </exception>
    public User(Guid id, string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("User name cannot be null or whitespace.", nameof(name));

        Id   = id;
        Name = name;
    }
}
