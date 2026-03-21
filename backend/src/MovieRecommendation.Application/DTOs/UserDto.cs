namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Data transfer object that represents a user as exposed through the application layer.
/// </summary>
/// <param name="Id">The unique identifier of the user.</param>
/// <param name="Name">The display name of the user.</param>
public record UserDto(Guid Id, string Name);
