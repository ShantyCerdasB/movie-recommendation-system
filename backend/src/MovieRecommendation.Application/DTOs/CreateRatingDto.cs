namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Data transfer object used when a client submits a new rating.
/// The application layer is responsible for assigning the record identifier.
/// </summary>
/// <param name="UserId">The identifier of the user submitting the rating.</param>
/// <param name="MovieId">The identifier of the movie being rated.</param>
/// <param name="Score">The numeric score in the range [1.0, 5.0].</param>
public record CreateRatingDto(Guid UserId, Guid MovieId, double Score);
