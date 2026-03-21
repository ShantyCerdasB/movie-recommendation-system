namespace MovieRecommendation.Domain.Entities;

/// <summary>
/// Encapsulates a single movie recommendation produced by the domain service.
/// Carries both the predicted score and the intermediate values used to derive it,
/// making the linear-algebra computation transparent for academic inspection.
/// </summary>
public sealed class RecommendationResult
{
    /// <summary>Gets the identifier of the recommended movie.</summary>
    public Guid MovieId { get; private set; }

    /// <summary>Gets the title of the recommended movie.</summary>
    public string MovieTitle { get; private set; }

    /// <summary>
    /// Gets the predicted rating score for the target user.
    /// This value is computed via cosine-similarity-weighted averaging
    /// of neighbouring users' ratings.
    /// </summary>
    public double PredictedScore { get; private set; }

    /// <summary>
    /// Gets the aggregate cosine similarity weight used when computing
    /// <see cref="PredictedScore"/>. A higher value indicates stronger
    /// agreement between the target user and the neighbours who rated this movie.
    /// </summary>
    public double SimilarityWeight { get; private set; }

    /// <summary>
    /// Gets a human-readable explanation of how this recommendation was generated,
    /// suitable for display in an academic demonstration.
    /// </summary>
    public string Explanation { get; private set; }

    /// <summary>
    /// Initializes a new instance of the <see cref="RecommendationResult"/> class.
    /// </summary>
    /// <param name="movieId">The identifier of the recommended movie.</param>
    /// <param name="movieTitle">The title of the recommended movie.</param>
    /// <param name="predictedScore">The cosine-similarity-weighted predicted rating.</param>
    /// <param name="similarityWeight">The aggregate similarity weight used in the computation.</param>
    /// <param name="explanation">A plain-language explanation of the recommendation.</param>
    public RecommendationResult(
        Guid   movieId,
        string movieTitle,
        double predictedScore,
        double similarityWeight,
        string explanation)
    {
        MovieId         = movieId;
        MovieTitle      = movieTitle      ?? string.Empty;
        PredictedScore  = predictedScore;
        SimilarityWeight = similarityWeight;
        Explanation     = explanation     ?? string.Empty;
    }
}
