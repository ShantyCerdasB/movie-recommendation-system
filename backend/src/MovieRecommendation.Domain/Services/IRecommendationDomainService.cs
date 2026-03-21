using MovieRecommendation.Domain.Entities;

namespace MovieRecommendation.Domain.Services;

/// <summary>
/// Defines the domain-level recommendation logic based on user-based
/// collaborative filtering with cosine similarity.
/// </summary>
public interface IRecommendationDomainService
{
    /// <summary>
    /// Generates a ranked list of movie recommendations for the specified user.
    /// </summary>
    /// <remarks>
    /// The algorithm proceeds as follows:
    /// <list type="number">
    ///   <item>Construct a user-movie rating matrix from <paramref name="ratings"/>.</item>
    ///   <item>Compute pairwise cosine similarities between all users.</item>
    ///   <item>
    ///     For each movie the target user has not yet rated, predict a score using
    ///     the similarity-weighted average of neighbour ratings.
    ///   </item>
    ///   <item>Return the top-<paramref name="topN"/> predictions by predicted score.</item>
    /// </list>
    /// </remarks>
    /// <param name="targetUserId">The unique identifier of the user to generate recommendations for.</param>
    /// <param name="users">The full set of users available in the system.</param>
    /// <param name="movies">The full catalogue of movies.</param>
    /// <param name="ratings">All ratings recorded in the system.</param>
    /// <param name="topN">The maximum number of recommendations to return. Defaults to 5.</param>
    /// <returns>
    /// An ordered enumerable of <see cref="RecommendationResult"/> objects, sorted by
    /// predicted score descending, containing at most <paramref name="topN"/> entries.
    /// </returns>
    IEnumerable<RecommendationResult> GenerateRecommendations(
        Guid                targetUserId,
        IEnumerable<User>   users,
        IEnumerable<Movie>  movies,
        IEnumerable<Rating> ratings,
        int                 topN = 5);
}
