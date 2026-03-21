namespace MovieRecommendation.Domain.Entities;

/// <summary>
/// Represents a rating given by a user to a specific movie.
/// The score is constrained to the range [1.0, 5.0].
/// </summary>
public sealed class Rating
{
    /// <summary>Gets the unique identifier of this rating record.</summary>
    public Guid Id { get; private set; }

    /// <summary>Gets the identifier of the user who submitted the rating.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Gets the identifier of the movie that was rated.</summary>
    public Guid MovieId { get; private set; }

    /// <summary>
    /// Gets the numeric score assigned by the user.
    /// Valid range is 1.0 (lowest) to 5.0 (highest).
    /// </summary>
    public double Score { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Rating"/> class.
    /// </summary>
    /// <param name="id">The unique identifier for this rating record.</param>
    /// <param name="userId">The identifier of the rating user.</param>
    /// <param name="movieId">The identifier of the rated movie.</param>
    /// <param name="score">The numeric score in the range [1.0, 5.0].</param>
    /// <exception cref="ArgumentOutOfRangeException">
    /// Thrown when <paramref name="score"/> is outside the range [1.0, 5.0].
    /// </exception>
    public Rating(Guid id, Guid userId, Guid movieId, double score)
    {
        if (score < 1.0 || score > 5.0)
            throw new ArgumentOutOfRangeException(nameof(score), score,
                "Rating score must be between 1.0 and 5.0 inclusive.");

        Id      = id;
        UserId  = userId;
        MovieId = movieId;
        Score   = score;
    }
}
