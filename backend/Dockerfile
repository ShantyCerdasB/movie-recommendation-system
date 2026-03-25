FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MovieRecommendation.sln ./
COPY src/MovieRecommendation.API/MovieRecommendation.API.csproj src/MovieRecommendation.API/
COPY src/MovieRecommendation.Application/MovieRecommendation.Application.csproj src/MovieRecommendation.Application/
COPY src/MovieRecommendation.Domain/MovieRecommendation.Domain.csproj src/MovieRecommendation.Domain/
COPY src/MovieRecommendation.Infrastructure/MovieRecommendation.Infrastructure.csproj src/MovieRecommendation.Infrastructure/

RUN dotnet restore src/MovieRecommendation.API/MovieRecommendation.API.csproj

COPY src/ ./src/

RUN dotnet publish src/MovieRecommendation.API/MovieRecommendation.API.csproj \
    --configuration Release \
    --output /app/publish \
    /p:UseAppHost=false

FROM public.ecr.aws/lambda/dotnet:8
WORKDIR /var/task
COPY --from=build /app/publish ./
CMD ["MovieRecommendation.API"]
