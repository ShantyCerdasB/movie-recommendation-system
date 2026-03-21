using Microsoft.OpenApi.Models;

namespace MovieRecommendation.API.Extensions;

/// <summary>
/// Extension methods that configure Swagger/OpenAPI documentation for the application.
/// </summary>
public static class SwaggerExtensions
{
    /// <summary>
    /// Registers the Swagger generator and configures the OpenAPI document metadata.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to configure.</param>
    /// <returns>The same <see cref="IServiceCollection"/> instance, allowing call chaining.</returns>
    /// <remarks>
    /// Adds a single OpenAPI document with version <c>v1</c>. The title and description
    /// convey the academic purpose of the project to consumers browsing the Swagger UI.
    /// </remarks>
    public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Movie Recommendation API",
                Version = "v1",
                Description = "Academic project demonstrating linear algebra applied to collaborative filtering.",
            });
        });

        return services;
    }

    /// <summary>
    /// Mounts the Swagger middleware and the Swagger UI at their default endpoints.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication"/> to configure.</param>
    /// <returns>The same <see cref="WebApplication"/> instance, allowing call chaining.</returns>
    /// <remarks>
    /// The Swagger JSON is served at <c>/swagger/v1/swagger.json</c> and the interactive
    /// UI is available at <c>/swagger</c>. This method is intended to be called regardless
    /// of environment for academic demonstrations, but can be guarded with
    /// <c>app.Environment.IsDevelopment()</c> in production scenarios.
    /// </remarks>
    public static WebApplication UseSwaggerDocumentation(this WebApplication app)
    {
        app.UseSwagger();
        app.UseSwaggerUI(options =>
        {
            options.SwaggerEndpoint("/swagger/v1/swagger.json", "Movie Recommendation API v1");
        });

        return app;
    }
}
