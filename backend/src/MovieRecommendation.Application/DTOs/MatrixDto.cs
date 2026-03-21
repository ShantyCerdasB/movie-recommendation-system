namespace MovieRecommendation.Application.DTOs;

/// <summary>
/// Carries the user-movie rating matrix together with the axis labels needed
/// to render it in a human-readable table or heatmap.
/// </summary>
/// <remarks>
/// The matrix has shape [<see cref="UserNames"/>.Length, <see cref="MovieTitles"/>.Length].
/// A value of 0 in <see cref="Ratings"/> means the corresponding user has not rated
/// the corresponding movie (missing entry).
/// </remarks>
public sealed class MatrixDto
{
    /// <summary>
    /// Gets or sets the ordered list of user display names that label the rows of
    /// <see cref="Ratings"/>.
    /// </summary>
    public string[] UserNames { get; set; } = Array.Empty<string>();

    /// <summary>
    /// Gets or sets the ordered list of movie titles that label the columns of
    /// <see cref="Ratings"/>.
    /// </summary>
    public string[] MovieTitles { get; set; } = Array.Empty<string>();

    /// <summary>
    /// Gets or sets the two-dimensional rating matrix of shape [users, movies].
    /// Each entry is the rating (1.0–5.0) given by the row user to the column movie,
    /// or 0 when the user has not rated that movie.
    /// </summary>
    public double[][] Ratings { get; set; } = Array.Empty<double[]>();
}
