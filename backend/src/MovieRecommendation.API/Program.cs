using MovieRecommendation.API.Extensions;
using MovieRecommendation.Infrastructure.Seed;

/// <summary>
/// Entry point for the Movie Recommendation API.
/// Configures the ASP.NET Core dependency injection container, registers all application
/// and infrastructure services, builds the HTTP request pipeline, and starts the web host.
/// </summary>
/// <remarks>
/// Service registration follows a layered approach:
/// <list type="bullet">
///   <item>
///     <see cref="InfrastructureServiceExtensions.AddInfrastructure"/> registers in-memory
///     repositories (pre-seeded), domain services (cosine similarity and recommendation
///     engine), and application services (movie, user, rating, recommendation, matrix).
///   </item>
///   <item>
///     <see cref="SwaggerExtensions.AddSwaggerDocumentation"/> configures the OpenAPI
///     document for interactive API exploration at <c>/swagger</c>.
///   </item>
///   <item>
///     <see cref="CorsExtensions.AddCorsPolicy"/> registers the permissive <c>AllowAll</c>
///     CORS policy required for development front-end clients running on different origins.
///   </item>
/// </list>
/// </remarks>
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDocumentation();
builder.Services.AddCorsPolicy();
builder.Services.AddInfrastructure();

var app = builder.Build();

app.UseSwaggerDocumentation();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapGet("/health", () => Results.Ok(new
{
    status = "ok",
    service = "movie-recommendation-api"
}));
app.MapControllers();
app.Run();
