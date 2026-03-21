using MovieRecommendation.Domain.Entities;
using MovieRecommendation.Domain.Repositories;

namespace MovieRecommendation.Infrastructure.Repositories;

/// <summary>
/// In-memory implementation of <see cref="IRatingRepository"/>.
/// </summary>
/// <remarks>
/// This implementation stores ratings in a private mutable <see cref="List{T}"/>.
/// The list is initialised from the seed data supplied at construction time and supports
/// runtime additions and updates, making it suitable for interactive academic demonstrations.
/// </remarks>
public sealed class RatingRepository : IRatingRepository
{
    private readonly List<Rating> _ratings;

    /// <summary>
    /// Initialises a new instance of <see cref="RatingRepository"/> with a pre-seeded collection.
    /// </summary>
    /// <param name="ratings">
    /// The initial set of ratings to populate the repository.
    /// The sequence is copied into an internal mutable list so that subsequent calls to
    /// <see cref="AddAsync"/> and <see cref="UpdateAsync"/> operate on that list.
    /// </param>
    public RatingRepository(IEnumerable<Rating> ratings)
    {
        _ratings = ratings.ToList();
    }

    /// <summary>
    /// Retrieves all ratings currently stored in the repository.
    /// </summary>
    /// <returns>
    /// A completed task whose result is a read-only list of all ratings.
    /// </returns>
    public Task<IReadOnlyList<Rating>> GetAllAsync()
    {
        IReadOnlyList<Rating> result = _ratings.AsReadOnly();
        return Task.FromResult(result);
    }

    /// <summary>
    /// Retrieves all ratings submitted by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user whose ratings are requested.</param>
    /// <returns>
    /// A completed task whose result is a read-only list of ratings belonging to the specified user.
    /// The list is empty if the user has not submitted any ratings.
    /// </returns>
    public Task<IReadOnlyList<Rating>> GetByUserIdAsync(Guid userId)
    {
        IReadOnlyList<Rating> result = _ratings
            .Where(r => r.UserId == userId)
            .ToList()
            .AsReadOnly();

        return Task.FromResult(result);
    }

    /// <summary>
    /// Retrieves a single rating by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the rating to retrieve.</param>
    /// <returns>
    /// A completed task whose result is the matching <see cref="Rating"/>, or <c>null</c> if none exists.
    /// </returns>
    public Task<Rating?> GetByIdAsync(Guid id)
    {
        Rating? rating = _ratings.FirstOrDefault(r => r.Id == id);
        return Task.FromResult(rating);
    }

    /// <summary>
    /// Appends a new rating to the in-memory store.
    /// </summary>
    /// <param name="rating">The rating entity to persist.</param>
    /// <returns>A completed task that resolves once the rating has been added to the internal list.</returns>
    public Task AddAsync(Rating rating)
    {
        _ratings.Add(rating);
        return Task.CompletedTask;
    }

    /// <summary>
    /// Replaces an existing rating entry with the supplied updated entity.
    /// </summary>
    /// <param name="rating">
    /// The updated rating. The <see cref="Rating.Id"/> property is used to locate the existing record.
    /// </param>
    /// <returns>A completed task that resolves once the replacement has been performed.</returns>
    /// <remarks>
    /// If no rating with a matching <see cref="Rating.Id"/> exists the operation is a no-op.
    /// </remarks>
    public Task UpdateAsync(Rating rating)
    {
        int index = _ratings.FindIndex(r => r.Id == rating.Id);

        if (index >= 0)
        {
            _ratings[index] = rating;
        }

        return Task.CompletedTask;
    }
}
