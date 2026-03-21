# Movie Recommendation System — Claude Agent Guide

This file is read automatically by Claude Code at the start of every session.
It gives any AI agent (or human developer) the full context needed to continue
work on this project without re-explaining everything from scratch.

---

## What this project is

A university project demonstrating **user-based collaborative filtering** using
pure linear algebra (no ML libraries). The math is intentional and academic:
cosine similarity computed from scratch in C#.

**Stack:**
- Backend: ASP.NET Core 8 Web API, C#, DDD architecture, in-memory repositories
- Frontend: React 18, TypeScript, Vite, Tailwind CSS v3, TanStack Query v5, React Router v6
- i18n: react-i18next with inline translations (EN + ES), namespace `common` and `pages`

---

## How to run

**Backend** (port 5000):
```powershell
& "C:\Program Files\dotnet\dotnet.exe" run --project "backend\src\MovieRecommendation.API"
```

**Frontend** (port 5173):
```powershell
cd frontend
npm install   # first time only
npm run dev
```

**Build frontend:**
```powershell
cd frontend
npx vite build
```

---

## Architecture

```
movie-recommendation-system/
├── backend/
│   └── src/
│       ├── MovieRecommendation.Domain/          # Entities, repository interfaces, domain service interfaces
│       │   ├── Entities/                        # Movie, User, Rating, RecommendationResult
│       │   ├── Repositories/                    # IMovieRepository, IUserRepository, IRatingRepository
│       │   └── Services/                        # ICosineSimilarityService, IRecommendationDomainService
│       ├── MovieRecommendation.Application/     # DTOs, application service interfaces + implementations
│       │   ├── DTOs/                            # MovieDto, UserDto, RatingDto, RecommendationDto, MatrixDto, SimilarityDto
│       │   ├── Interfaces/                      # IMovieService, IUserService, IRatingService, IRecommendationService, IMatrixService
│       │   └── Services/                        # MovieService, UserService, RatingService, RecommendationService, MatrixService
│       ├── MovieRecommendation.Infrastructure/  # In-memory repos, cosine math, seed data
│       │   ├── Repositories/                    # MovieRepository, UserRepository, RatingRepository (in-memory)
│       │   ├── Seed/                            # SeedData.cs (15 movies, 10 users, 70 ratings) + InfrastructureServiceExtensions
│       │   └── Services/                        # CosineSimilarityService, RecommendationDomainService
│       └── MovieRecommendation.API/             # Controllers, Program.cs, DI wiring
│           ├── Controllers/                     # MoviesController, UsersController, RatingsController,
│           │                                    #   RecommendationsController, MatrixController
│           └── Extensions/                      # CorsExtensions, SwaggerExtensions
│
└── frontend/
    └── src/
        ├── app/
        │   ├── i18n/config.ts                   # ALL translations live here (EN + ES, namespaces: common, pages)
        │   └── routing/AppRouter.tsx            # Route definitions
        ├── layouts/
        │   ├── Navbar.tsx                       # Top bar + LanguageSwitcher
        │   └── MainLayout.tsx                   # Shell: Navbar + Sidebar + <Outlet>
        ├── shared/                              # Reusable across features
        │   ├── components/                      # PageHeader, LoadingSpinner, EmptyState, ErrorBoundary,
        │   │                                    #   LanguageSwitcher, ui/ (Card, Badge, Button, Select, Spinner)
        │   ├── hooks/                           # useDebounce
        │   └── utils/                           # cn (classnames), formatters
        ├── types/api.types.ts                   # All DTO interfaces mirroring backend responses
        ├── services/                            # httpClient (axios), apiConfig (base URL)
        │
        ├── movies/                              # Feature: movie catalog
        ├── users/                              # Feature: user profiles + ratings list
        ├── recommendations/                    # Feature: recommendation engine UI
        ├── matrix-view/                        # Feature: ratings matrix + similarity matrix heatmaps
        └── math-explanation/                   # Feature: static academic walkthrough (no data fetching)
```

Each feature folder follows **Screaming Architecture**:
```
<feature>/
  components/   UI components specific to this feature
  hooks/        TanStack Query hooks (useMovies, useUsers, etc.)
  pages/        Full-page route components
  services/     API call functions
  types/        Feature-specific TypeScript types
```

---

## Key files to know

| File | Purpose |
|---|---|
| `backend/src/.../Seed/SeedData.cs` | 15 movies with TMDB/Amazon poster URLs, 10 users, 70 ratings |
| `backend/src/.../Services/CosineSimilarityService.cs` | Pure C# cosine similarity — the core math |
| `backend/src/.../Services/RecommendationDomainService.cs` | KNN + weighted prediction logic |
| `backend/src/.../Services/MatrixService.cs` | Builds R matrix and S similarity matrix |
| `frontend/src/app/i18n/config.ts` | **Single source of truth for all UI text** (EN + ES) |
| `frontend/src/types/api.types.ts` | All DTO shapes — update here if backend changes |
| `frontend/src/services/apiConfig.ts` | Base URL (`http://localhost:5000/api`) |

---

## Important conventions

### Backend
- XML doc comments (`/// <summary>`) on all public members
- No database — all data is in-memory, seeded from `SeedData.cs` on startup
- `double[][]` jagged arrays in DTOs (not `double[,]`) — System.Text.Json can't serialize rectangular arrays
- Repository interfaces return `Task<IReadOnlyList<T>>`, not `IEnumerable<T>`
- `RecommendationResult` constructor requires all 5 params: `(movieId, movieTitle, predictedScore, similarityWeight, explanation)`

### Frontend
- **Never hardcode UI strings** — all text must go through `useTranslation()` with a key in `config.ts`
- TSDoc (`/** */`) on all exported components, hooks, and utilities
- Poster images come from Amazon CDN (`m.media-amazon.com`) — URLs are stored in `SeedData.cs`
- `useTranslation('common')` for shared labels, `useTranslation('pages')` for page-specific content
- TanStack Query v5 syntax: `useQuery({ queryKey: [...], queryFn: ... })`

---

## Known pre-existing TypeScript errors (non-blocking)

These exist before any changes and do not prevent the app from running:
- `useMatrices.ts` — `fetchRatingsMatrix` name mismatch (should be `fetchRatingMatrix`)
- `apiConfig.ts` / `httpClient.ts` — `ImportMeta.env` type not declared
- `UserProfileCard.tsx` — unused `Card` import

The app builds and runs correctly via `npx vite build` despite these errors.

---

## Adding a new feature

1. Create `frontend/src/<feature-name>/` with subfolders: `components/`, `hooks/`, `pages/`, `services/`, `types/`
2. Add route in `frontend/src/app/routing/AppRouter.tsx`
3. Add nav entry in `frontend/src/layouts/Navbar.tsx` and `MainLayout.tsx` (use a `labelKey`, not a hardcoded string)
4. Add translation keys to both `en` and `es` blocks in `frontend/src/app/i18n/config.ts`
5. Add backend controller + application service + domain logic following existing DDD layers

## Adding a new movie

Edit `SeedData.cs` — find a poster URL via:
```bash
curl "https://www.omdbapi.com/?i=<IMDB_ID>&apikey=trilogy"
# returns JSON with "Poster" field containing a valid m.media-amazon.com URL
```

---

## Academic context

**Course:** Linear Algebra — university project
**Topic chosen:** #3 — Simple recommendation system using linear algebra
**Key math:** cosine similarity `sim(A,B) = (A·B) / (‖A‖·‖B‖)`, KNN, weighted prediction
**Presentation flow:** `/matrix` (show data) → `/math` (explain algorithm) → `/recommendations` (live demo) → limitations
