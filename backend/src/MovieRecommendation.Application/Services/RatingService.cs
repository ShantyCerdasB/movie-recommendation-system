using MovieRecommendation.Application.DTOs;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Domain.Entities;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Application.Services;

/// <summary>
/// Application service that handles rating use-cases: querying existing ratings
/// and persisting new ones. It delegates persistence to <see cref="IRatingRepository"/>
/// and maps between domain entities and <see cref="RatingDto"/> objects.
/// </summary>
public sealed class RatingService : IRatingService
{
    private readonly IRatingRepository _ratingRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="RatingService"/> class.
    /// </summary>
    /// <param name="ratingRepository">
    /// The repository used to read and write <c>Rating</c> domain entities.
    /// </param>
    /// <exception cref="ArgumentNullException">
    /// Thrown when <paramref name="ratingRepository"/> is <c>null</c>.
    /// </exception>
    public RatingService(IRatingRepository ratingRepository)
    {
        _ratingRepository = ratingRepository
            ?? throw new ArgumentNullException(nameof(ratingRepository));
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<RatingDto>> GetAllRatingsAsync()
    {
        var ratings = await _ratingRepository.GetAllAsync();

        return ratings.Select(r => new RatingDto(r.Id, r.UserId, r.MovieId, r.Score));
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<RatingDto>> GetRatingsByUserAsync(Guid userId)
    {
        var ratings = await _ratingRepository.GetByUserIdAsync(userId);

        return ratings.Select(r => new RatingDto(r.Id, r.UserId, r.MovieId, r.Score));
    }

    /// <inheritdoc/>
    /// <remarks>
    /// A new <see cref="Guid"/> is generated for the rating's identifier before
    /// the entity is constructed and passed to the repository.
    /// </remarks>
    public async Task CreateRatingAsync(CreateRatingDto dto)
    {
        var rating = new Rating(
            id:      Guid.NewGuid(),
            userId:  dto.UserId,
            movieId: dto.MovieId,
            score:   dto.Score);

        await _ratingRepository.AddAsync(rating);
    }
}
