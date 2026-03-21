using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Repositories;
using MovieRecommendation.Domain.Services;

namespace MovieRecommendation.Application.Services;

/// <summary>
/// Application service that orchestrates the recommendation use-case.
/// It loads all required data from the repositories, delegates the
/// linear-algebra computation to <see cref="IRecommendationDomainService"/>,
/// and maps domain results to <see cref="RecommendationDto"/> objects
/// enriched with additional movie metadata (genre, poster URL).
/// </summary>
public sealed class RecommendationService : IRecommendationService
{
    private readonly IUserRepository               _userRepository;
    private readonly IMovieRepository              _movieRepository;
    private readonly IRatingRepository             _ratingRepository;
    private readonly IRecommendationDomainService  _recommendationDomainService;

    /// <summary>
    /// Initializes a new instance of the <see cref="RecommendationService"/> class.
    /// </summary>
    /// <param name="userRepository">Repository used to fetch all users.</param>
    /// <param name="movieRepository">Repository used to fetch all movies.</param>
    /// <param name="ratingRepository">Repository used to fetch all ratings.</param>
    /// <param name="recommendationDomainService">
    /// Domain service that performs cosine-similarity-based collaborative filtering.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when any of the supplied dependencies is <c>null</c>.
    /// </exception>
    public RecommendationService(
        IUserRepository              userRepository,
        IMovieRepository             movieRepository,
        IRatingRepository            ratingRepository,
        IRecommendationDomainService recommendationDomainService)
    {
        _userRepository              = userRepository
            ?? throw new ArgumentNullException(nameof(userRepository));
        _movieRepository             = movieRepository
            ?? throw new ArgumentNullException(nameof(movieRepository));
        _ratingRepository            = ratingRepository
            ?? throw new ArgumentNullException(nameof(ratingRepository));
        _recommendationDomainService = recommendationDomainService
            ?? throw new ArgumentNullException(nameof(recommendationDomainService));
    }

    /// <inheritdoc/>
    /// <remarks>
    /// All users, movies, and ratings are fetched in parallel to minimise latency.
    /// The domain service returns a sequence of <c>RecommendationResult</c> domain
    /// objects; this method projects each one onto a <see cref="RecommendationDto"/>
    /// by looking up the corresponding movie to obtain genre and poster URL.
    /// Movies that are no longer present in the catalogue are silently skipped.
    /// </remarks>
    public async Task<IEnumerable<RecommendationDto>> GetRecommendationsAsync(
        Guid userId,
        int  topN = 5)
    {
        // Fetch all data in parallel to reduce total I/O wait time.
        var usersTask   = _userRepository.GetAllAsync();
        var moviesTask  = _movieRepository.GetAllAsync();
        var ratingsTask = _ratingRepository.GetAllAsync();

        await Task.WhenAll(usersTask, moviesTask, ratingsTask);

        var users   = await usersTask;
        var movies  = (await moviesTask).ToList();
        var ratings = await ratingsTask;

        // Build a lookup dictionary for O(1) movie access.
        var movieLookup = movies.ToDictionary(m => m.Id);

        // Delegate the similarity computation and score prediction to the domain layer.
        var results = _recommendationDomainService.GenerateRecommendations(
            targetUserId: userId,
            users:        users,
            movies:       movies,
            ratings:      ratings,
            topN:         topN);

        // Project domain results to DTOs, enriching with movie metadata.
        var dtos = new List<RecommendationDto>();

        foreach (var result in results)
        {
            if (!movieLookup.TryGetValue(result.MovieId, out var movie))
                continue;

            dtos.Add(new RecommendationDto(
                MovieId:         result.MovieId,
                MovieTitle:      result.MovieTitle,
                Genre:           movie.Genre,
                PosterUrl:       movie.PosterUrl,
                PredictedScore:  result.PredictedScore,
                SimilarityWeight: result.SimilarityWeight,
                Explanation:     result.Explanation));
        }

        return dtos;
    }
}
