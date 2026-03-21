namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Data transfer object that carries a single movie recommendation to the presentation layer.
/// Includes the intermediate linear-algebra values so a client can display the computation.
/// </summary>
/// <param name="MovieId">The identifier of the recommended movie.</param>
/// <param name="MovieTitle">The title of the recommended movie.</param>
/// <param name="Genre">The genre of the recommended movie.</param>
/// <param name="PosterUrl">The URL of the recommended movie's poster image.</param>
/// <param name="PredictedScore">
/// The similarity-weighted predicted rating for the target user.
/// </param>
/// <param name="SimilarityWeight">
/// The aggregate cosine similarity weight used when computing <paramref name="PredictedScore"/>.
/// </param>
/// <param name="Explanation">
/// A plain-language explanation of how this recommendation was generated.
/// </param>
public record RecommendationDto(
    Guid   MovieId,
    string MovieTitle,
    string Genre,
    string PosterUrl,
    double PredictedScore,
    double SimilarityWeight,
    string Explanation);
