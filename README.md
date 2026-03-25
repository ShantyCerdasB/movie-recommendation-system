# Simple Movie Recommendation System Using Linear Algebra

An academic web application demonstrating user-based collaborative filtering powered by cosine similarity. Built with ASP.NET Core (DDD) and React (Screaming Architecture).

---

## Prerequisites

| Tool | Version | Download |
|---|---|---|
| .NET SDK | 8.0+ | https://dotnet.microsoft.com/download |
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | bundled with Node.js |

---

## Project Structure

```
movie-recommendation-system/
├── backend/
│   ├── MovieRecommendation.sln
│   └── src/
│       ├── MovieRecommendation.Domain/        # Entities, interfaces, exceptions
│       ├── MovieRecommendation.Application/   # DTOs, application services
│       ├── MovieRecommendation.Infrastructure/# Repositories, math engine, seed data
│       └── MovieRecommendation.API/           # Controllers, Swagger, DI wiring
└── frontend/
    └── src/
        ├── app/               # Routing, providers, app shell
        ├── movies/            # Movie catalog feature
        ├── users/             # User profiles feature
        ├── recommendations/   # Recommendation engine UI
        ├── matrix-view/       # Rating and similarity matrix view
        ├── math-explanation/  # Academic walkthrough of the math
        ├── shared/            # Reusable UI components, hooks, utils
        └── layouts/           # Page layout and navigation
```

---

## Running the Backend

```bash
cd backend
dotnet restore
dotnet run --project src/MovieRecommendation.API
```

The API starts at **http://localhost:5000**
Swagger UI is available at **http://localhost:5000/swagger**

---

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**

The Vite dev server proxies `/v1` requests to `http://localhost:5000`, so both services must run simultaneously.

---

## API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/v1/movies` | List all movies |
| GET | `/v1/movies/{id}` | Get a single movie |
| GET | `/v1/users` | List all users |
| GET | `/v1/users/{id}` | Get a single user |
| GET | `/v1/ratings` | List all ratings |
| GET | `/v1/ratings/user/{userId}` | Get ratings for a user |
| POST | `/v1/ratings` | Submit a new rating |
| GET | `/v1/recommendations/{userId}?topN=5` | Get recommendations for a user |
| GET | `/v1/matrix/ratings` | Get the full user-movie rating matrix |
| GET | `/v1/matrix/similarity` | Get the cosine similarity matrix |

---

## Frontend Pages

| URL | Page | Description |
|---|---|---|
| `/movies` | Movies | Full movie catalog |
| `/users` | Users | User list with rating history |
| `/recommendations` | Recommendations | Select a user and get recommendations |
| `/matrix` | Matrix View | Visual heatmap of ratings and similarity |
| `/math` | Math Explanation | Step-by-step linear algebra walkthrough |

---

## Mathematical Approach

The system implements **user-based collaborative filtering**:

1. Each user is represented as a rating vector **u** ∈ ℝⁿ (n = number of movies, 0 = unrated)
2. Similarity between users A and B is computed as cosine similarity:

   ```
   sim(A, B) = (A · B) / (‖A‖ · ‖B‖)
   ```

3. For each movie *m* not yet rated by the target user *t*, the predicted score is:

   ```
   score(t, m) = Σ [sim(t, u) × r(u, m)] / Σ |sim(t, u)|
   ```

   where the sum runs over all users *u* who rated *m* and have positive similarity with *t*.

4. Movies are ranked by predicted score and the top-N are returned.

---

## Demo Dataset

- **15 movies**: The Shawshank Redemption, The Godfather, The Dark Knight, Pulp Fiction, Forrest Gump, Inception, The Matrix, Interstellar, Goodfellas, Fight Club, The Silence of the Lambs, Schindler's List, The Lord of the Rings, Spirited Away, Parasite
- **10 users**: Alice, Bob, Carol, David, Emma, Frank, Grace, Henry, Isabella, James
- **70 ratings**: Distributed with distinct taste profiles (sci-fi fans, crime fans, drama fans) to produce meaningful similarity clusters

---

## Architecture

### Backend — Domain-Driven Design (DDD)

- **Domain layer**: Pure C# entities, value objects, and repository/service interfaces. Zero external dependencies.
- **Application layer**: Use-case orchestration services and DTOs. Depends only on Domain.
- **Infrastructure layer**: In-memory repository implementations, cosine similarity engine, seed data.
- **API layer**: ASP.NET Core controllers, Swagger setup, CORS, dependency injection wiring.

### Frontend — Screaming Architecture

Folder names reflect business features, not technical layers:

- `movies/` — movie catalog
- `users/` — user management
- `recommendations/` — recommendation UI
- `matrix-view/` — matrix visualization
- `math-explanation/` — academic documentation

Each feature contains its own `pages/`, `components/`, `hooks/`, `services/`, and `types/`.

---

## Future Improvements

- **Item-based collaborative filtering**: compute movie-movie similarity instead of user-user
- **Matrix factorization (SVD)**: decompose the rating matrix for latent factor modelling
- **Persistent database**: replace in-memory store with SQLite or PostgreSQL
- **Evaluation metrics**: RMSE, Precision@K, Recall@K
- **Real dataset import**: integrate MovieLens or TMDB dataset
- **Authentication**: user login and session-based personalization

---

## AWS Deployment

The repository now includes an `infra/` directory with Terraform for:

- S3 frontend hosting
- Cloudflare subdomain routing with a Worker-based SPA fallback
- API Gateway HTTP API
- Lambda container deployment for the .NET API
- GitHub Actions deployment through AWS OIDC

The frontend can use the default API Gateway endpoint in production through `VITE_API_URL`.

See `infra/README.md` for environment configuration, Terraform usage, and GitHub deployment setup.
