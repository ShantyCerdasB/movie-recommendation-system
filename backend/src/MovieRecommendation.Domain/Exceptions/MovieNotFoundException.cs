namespace MovieRecommendation.Domain.Exceptions;

/// <summary>
/// Thrown when a requested movie does not exist in the data source.
/// </summary>
public sealed class MovieNotFoundException : DomainException
{
    /// <summary>Gets the identifier of the movie that could not be found.</summary>
    public Guid MovieId { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="MovieNotFoundException"/> class.
    /// </summary>
    /// <param name="movieId">The identifier of the movie that was not found.</param>
    public MovieNotFoundException(Guid movieId)
        : base($"Movie with id {movieId} was not found.")
    {
        MovieId = movieId;
    }
}
