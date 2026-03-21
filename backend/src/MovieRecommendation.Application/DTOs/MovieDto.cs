namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Data transfer object that represents a movie as exposed through the application layer.
/// Instances are immutable; use the positional constructor to create them.
/// </summary>
/// <param name="Id">The unique identifier of the movie.</param>
/// <param name="Title">The title of the movie.</param>
/// <param name="Genre">The genre of the movie.</param>
/// <param name="ReleaseYear">The year the movie was released.</param>
/// <param name="PosterUrl">The URL of the movie's poster image.</param>
/// <param name="Description">A short textual description of the movie.</param>
public record MovieDto(
    Guid   Id,
    string Title,
    string Genre,
    int    ReleaseYear,
    string PosterUrl,
    string Description);
