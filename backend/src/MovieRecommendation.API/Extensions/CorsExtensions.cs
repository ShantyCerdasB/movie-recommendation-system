namespace MovieRecommendation.API.Extensions;

/// <summary>
/// Extension methods that configure Cross-Origin Resource Sharing (CORS) for the application.
/// </summary>
public static class CorsExtensions
{
    /// <summary>
    /// The name of the CORS policy registered by <see cref="AddCorsPolicy"/>.
    /// </summary>
    /// <remarks>
    /// Use this constant when referencing the policy by name in middleware configuration
    /// to avoid hard-coding the string in multiple places.
    /// </remarks>
    public const string PolicyName = "AllowAll";

    /// <summary>
    /// Registers a permissive CORS policy suitable for development and academic use.
    /// </summary>
    /// <param name="services">The <see cref="IServiceCollection"/> to configure.</param>
    /// <returns>The same <see cref="IServiceCollection"/> instance, allowing call chaining.</returns>
    /// <remarks>
    /// The policy named <c>AllowAll</c> permits requests from any origin, with any HTTP
    /// method and any headers. This configuration is intentionally open to remove friction
    /// when running a front-end development server on a different port or domain.
    /// It must not be used in a production environment without additional restrictions.
    /// </remarks>
    public static IServiceCollection AddCorsPolicy(this IServiceCollection services)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(PolicyName, policy =>
            {
                policy.AllowAnyOrigin()
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });

        return services;
    }

    /// <summary>
    /// Activates the <c>AllowAll</c> CORS policy in the request pipeline.
    /// </summary>
    /// <param name="app">The <see cref="WebApplication"/> to configure.</param>
    /// <returns>The same <see cref="WebApplication"/> instance, allowing call chaining.</returns>
    public static WebApplication UseCorsPolicy(this WebApplication app)
    {
        app.UseCors(PolicyName);
        return app;
    }
}
