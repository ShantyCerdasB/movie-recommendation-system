namespace MovieRecommendation.API.Configuration;

/// <summary>
/// Strongly-typed options class for recommendation-related configuration values.
/// </summary>
/// <remarks>
/// Bind this class to the <c>Recommendation</c> section in <c>appsettings.json</c> using
/// the ASP.NET Core options pattern:
/// <code>
/// builder.Services.Configure&lt;RecommendationOptions&gt;(
///     builder.Configuration.GetSection("Recommendation"));
/// </code>
/// </remarks>
public sealed class RecommendationOptions
{
    /// <summary>
    /// Gets or sets the maximum number of recommendations returned by the engine when
    /// no explicit <c>topN</c> query parameter is provided by the caller.
    /// </summary>
    /// <value>Defaults to <c>5</c>.</value>
    public int TopN { get; set; } = 5;
}
