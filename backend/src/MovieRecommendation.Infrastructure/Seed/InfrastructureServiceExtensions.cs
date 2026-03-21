using Microsoft.Extensions.DependencyInjection;
using MovieRecommendation.Application.Interfaces;
using MovieRecommendation.Application.Services;
using MovieRecommendation.Domain.Repositories;
using MovieRecommendation.Domain.Services;
using MovieRecommendation.Infrastructure.Repositories;
using MovieRecommendation.Infrastructure.Services;

namespace MovieRecommendation.Infrastructure.Seed;

/// <summary>
/// Provides an extension method for <see cref="IServiceCollection"/> that registers all
/// infrastructure-layer services required by the application.
/// </summary>
public static class InfrastructureServiceExtensions
{
    /// <summary>
    /// Registers infrastructure repositories, domain services, and application services
    /// with the dependency injection container.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to configure.</param>
    /// <returns>The same <see cref="IServiceCollection"/> instance, allowing call chaining.</returns>
    /// <remarks>
    /// <para>
    /// Repositories are registered as singletons because the in-memory data store must
    /// persist for the lifetime of the application. Each repository is initialised with the
    /// corresponding <see cref="SeedData"/> collection so that data is available immediately
    /// after startup without an explicit seed step.
    /// </para>
    /// <para>
    /// Domain services are stateless and are therefore also registered as singletons.
    /// Application services are registered as scoped so that they receive fresh repository
    /// references on each HTTP request, which is the conventional ASP.NET Core lifetime for
    /// services that coordinate units of work.
    /// </para>
    /// </remarks>
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        // Repositories — singleton, pre-seeded with static test data.
        services.AddSingleton<IMovieRepository>(_ =>
            new MovieRepository(SeedData.Movies));

        services.AddSingleton<IUserRepository>(_ =>
            new UserRepository(SeedData.Users));

        services.AddSingleton<IRatingRepository>(_ =>
            new RatingRepository(SeedData.Ratings));

        // Domain services — stateless mathematical and algorithmic components.
        services.AddSingleton<ICosineSimilarityService, CosineSimilarityService>();
        services.AddSingleton<IRecommendationDomainService, RecommendationDomainService>();

        // Application services — coordinate domain logic and repository access per request.
        services.AddScoped<IMovieService, MovieService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRatingService, RatingService>();
        services.AddScoped<IRecommendationService, RecommendationService>();
        services.AddScoped<IMatrixService, MatrixService>();

        return services;
    }
}
