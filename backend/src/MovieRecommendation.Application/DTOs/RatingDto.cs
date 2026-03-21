namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Data transfer object that represents a recorded rating as exposed through the application layer.
/// </summary>
/// <param name="Id">The unique identifier of the rating record.</param>
/// <param name="UserId">The identifier of the user who submitted the rating.</param>
/// <param name="MovieId">The identifier of the rated movie.</param>
/// <param name="Score">The numeric score in the range [1.0, 5.0].</param>
public record RatingDto(Guid Id, Guid UserId, Guid MovieId, double Score);
