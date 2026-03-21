namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Carries the user-similarity matrix together with the user labels needed
/// to render it in a human-readable table or heatmap.
/// </summary>
/// <remarks>
/// The matrix is symmetric with shape
/// [<see cref="UserNames"/>.Length, <see cref="UserNames"/>.Length].
/// Diagonal entries equal 1 because each user has perfect cosine similarity
/// with themselves. Off-diagonal entry [i, j] is the cosine similarity between
/// the rating vector of user i and the rating vector of user j.
/// </remarks>
public sealed class SimilarityDto
{
    /// <summary>
    /// Gets or sets the ordered list of user display names that label both the
    /// rows and the columns of <see cref="Similarities"/>.
    /// </summary>
    public string[] UserNames { get; set; } = Array.Empty<string>();

    /// <summary>
    /// Gets or sets the symmetric cosine-similarity matrix of shape [users, users].
    /// Each entry lies in [0, 1] for non-negative rating vectors.
    /// </summary>
    public double[][] Similarities { get; set; } = Array.Empty<double[]>();
}
