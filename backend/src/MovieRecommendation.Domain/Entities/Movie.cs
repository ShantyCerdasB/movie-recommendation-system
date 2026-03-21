namespace MovieRecommendation.Domain.Entities;

/// <summary>
/// Represents a movie in the recommendation system.
/// </summary>
public sealed class Movie
{
    /// <summary>Gets the unique identifier of the movie.</summary>
    public Guid Id { get; private set; }

    /// <summary>Gets the title of the movie.</summary>
    public string Title { get; private set; }

    /// <summary>Gets the genre of the movie (e.g., "Action", "Drama").</summary>
    public string Genre { get; private set; }

    /// <summary>Gets the year the movie was released.</summary>
    public int ReleaseYear { get; private set; }

    /// <summary>Gets the URL of the movie's poster image.</summary>
    public string PosterUrl { get; private set; }

    /// <summary>Gets a short textual description of the movie.</summary>
    public string Description { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="Movie"/> class.
    /// </summary>
    /// <param name="id">The unique identifier for the movie.</param>
    /// <param name="title">The title of the movie.</param>
    /// <param name="genre">The genre of the movie.</param>
    /// <param name="releaseYear">The year the movie was released.</param>
    /// <param name="posterUrl">The URL pointing to the movie's poster image.</param>
    /// <param name="description">A short description of the movie.</param>
    /// <exception cref="ArgumentException">
    /// Thrown when <paramref name="title"/> or <paramref name="genre"/> is null or whitespace.
    /// </exception>
    public Movie(Guid id, string title, string genre, int releaseYear, string posterUrl, string description)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Movie title cannot be null or whitespace.", nameof(title));

        if (string.IsNullOrWhiteSpace(genre))
            throw new ArgumentException("Movie genre cannot be null or whitespace.", nameof(genre));

        Id          = id;
        Title       = title;
        Genre       = genre;
        ReleaseYear = releaseYear;
        PosterUrl   = posterUrl   ?? string.Empty;
        Description = description ?? string.Empty;
    }
}
