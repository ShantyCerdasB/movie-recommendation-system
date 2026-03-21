using MovieRecommendation.Domain.Entities;

namespace MovieRecommendation.Infrastructure.Seed;

/// <summary>
/// Provides static seed data for the in-memory repositories used during development and academic demonstrations.
/// </summary>
/// <remarks>
/// All identifiers are hardcoded <see cref="Guid"/> values so that relationships between
/// <see cref="Movie"/>, <see cref="User"/>, and <see cref="Rating"/> entities remain stable
/// across application restarts. Ratings are intentionally distributed unevenly to create
/// meaningful collaborative filtering scenarios where recommendation gaps can be filled.
/// </remarks>
public static class SeedData
{
    /// <summary>
    /// Gets the catalogue of 15 well-known movies used to seed the movie repository.
    /// </summary>
    /// <remarks>
    /// Movies span several genres — drama, crime, action, sci-fi, thriller, biography, animation, and
    /// foreign language — so that users with different taste profiles can be modelled realistically.
    /// </remarks>
    public static IReadOnlyList<Movie> Movies { get; } = new List<Movie>
    {
        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000001"),
            title: "The Shawshank Redemption",
            genre: "Drama",
            releaseYear: 1994,
            description: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of decency.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000002"),
            title: "The Godfather",
            genre: "Crime, Drama",
            releaseYear: 1972,
            description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000003"),
            title: "The Dark Knight",
            genre: "Action, Crime, Drama",
            releaseYear: 2008,
            description: "Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"),


        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000004"),
            title: "Pulp Fiction",
            genre: "Crime, Drama",
            releaseYear: 1994,
            description: "The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000005"),
            title: "Forrest Gump",
            genre: "Drama, Romance",
            releaseYear: 1994,
            description: "The presidencies of Kennedy and Johnson, the Vietnam War, and Watergate, seen through the eyes of a man from Alabama.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000006"),
            title: "Inception",
            genre: "Action, Adventure, Sci-Fi",
            releaseYear: 2010,
            description: "A thief who steals corporate secrets by entering the subconscious is given the inverse task of planting an idea.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000007"),
            title: "The Matrix",
            genre: "Action, Sci-Fi",
            releaseYear: 1999,
            description: "A computer hacker learns that reality as he knows it is a simulation run by machines, and joins a rebellion.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000008"),
            title: "Interstellar",
            genre: "Adventure, Drama, Sci-Fi",
            releaseYear: 2014,
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000009"),
            title: "Goodfellas",
            genre: "Biography, Crime, Drama",
            releaseYear: 1990,
            description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his friends.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000010"),
            title: "Fight Club",
            genre: "Drama",
            releaseYear: 1999,
            description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000011"),
            title: "The Silence of the Lambs",
            genre: "Crime, Drama, Thriller",
            releaseYear: 1991,
            description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNDdhOGJhYzctYzYwZC00YmI2LWI0MjctYjg4ODdlMDExYjBlXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000012"),
            title: "Schindler's List",
            genre: "Biography, Drama, History",
            releaseYear: 1993,
            description: "In German-occupied Poland, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNjM1ZDQxYWUtMzQyZS00MTE1LWJmZGYtNGUyNTdlYjM3ZmVmXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000013"),
            title: "The Lord of the Rings: The Fellowship of the Ring",
            genre: "Adventure, Drama, Fantasy",
            releaseYear: 2001,
            description: "A meek Hobbit and eight companions set out on a journey to destroy the One Ring and the dark lord Sauron.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNzIxMDQ2YTctNDY4MC00ZTRhLTk4ODQtMTVlOWY4NTdiYmMwXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000014"),
            title: "Spirited Away",
            genre: "Animation, Adventure, Family",
            releaseYear: 2001,
            description: "During her family's move to the suburbs, a sullen ten-year-old girl wanders into a world ruled by gods and witches.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_SX300.jpg"),

        new Movie(
            id: Guid.Parse("a1000000-0000-0000-0000-000000000015"),
            title: "Parasite",
            genre: "Comedy, Drama, Thriller",
            releaseYear: 2019,
            description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim family.",
            posterUrl: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_SX300.jpg"),
    }.AsReadOnly();

    /// <summary>
    /// Gets the list of 10 users used to seed the user repository.
    /// </summary>
    /// <remarks>
    /// Each user is assigned a stable <see cref="Guid"/> so that rating associations remain
    /// consistent across restarts. Users represent a variety of taste profiles — some favour
    /// action and sci-fi, others prefer drama and biography — to make the collaborative
    /// filtering results non-trivial.
    /// </remarks>
    public static IReadOnlyList<User> Users { get; } = new List<User>
    {
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000001"), name: "Alice"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000002"), name: "Bob"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000003"), name: "Carol"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000004"), name: "David"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000005"), name: "Emma"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000006"), name: "Frank"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000007"), name: "Grace"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000008"), name: "Henry"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000009"), name: "Isabella"),
        new User(id: Guid.Parse("b2000000-0000-0000-0000-000000000010"), name: "James"),
    }.AsReadOnly();

    /// <summary>
    /// Gets the collection of seed ratings linking users to movies with realistic score distributions.
    /// </summary>
    /// <remarks>
    /// Each user has rated at least 5 movies, and no user has rated all 15 movies, leaving gaps that the
    /// recommendation engine can fill. Scores are drawn from {1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0}
    /// to reflect authentic user behaviour rather than uniform high ratings.
    /// Users with similar taste profiles (e.g., Alice and Bob both preferring sci-fi) will produce high
    /// cosine similarity, while users with opposite profiles will produce low similarity.
    /// </remarks>
    public static IReadOnlyList<Rating> Ratings { get; } = new List<Rating>
    {
        // ── Alice (b2…01): prefers sci-fi and drama; dislikes horror ──────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000001"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000001"), score: 5.0), // Shawshank
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000002"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 5.0), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000003"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000007"), score: 4.5), // The Matrix
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000004"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000008"), score: 4.5), // Interstellar
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000005"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000005"), score: 4.0), // Forrest Gump
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000006"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000013"), score: 4.0), // LOTR
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000007"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000001"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000011"), score: 2.5), // Silence of Lambs

        // ── Bob (b2…02): loves action and sci-fi; similar to Alice ───────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000008"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000003"), score: 5.0), // Dark Knight
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000009"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 5.0), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000010"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000007"), score: 5.0), // The Matrix
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000011"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000008"), score: 4.5), // Interstellar
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000012"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000001"), score: 4.0), // Shawshank
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000013"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000010"), score: 3.5), // Fight Club
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000014"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000002"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000014"), score: 2.0), // Spirited Away

        // ── Carol (b2…03): prefers crime and drama; strong Godfather/Goodfellas taste ────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000015"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000002"), score: 5.0), // Godfather
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000016"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000009"), score: 5.0), // Goodfellas
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000017"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000004"), score: 4.5), // Pulp Fiction
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000018"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000011"), score: 4.0), // Silence of Lambs
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000019"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000012"), score: 4.5), // Schindler's List
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000020"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000001"), score: 4.0), // Shawshank
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000021"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000003"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000007"), score: 2.0), // The Matrix

        // ── David (b2…04): diverse taste — adventure and fantasy ─────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000022"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000013"), score: 5.0), // LOTR
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000023"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000014"), score: 4.5), // Spirited Away
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000024"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000005"), score: 4.5), // Forrest Gump
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000025"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000008"), score: 4.0), // Interstellar
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000026"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 3.5), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000027"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000015"), score: 4.0), // Parasite
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000028"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000004"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000010"), score: 2.5), // Fight Club

        // ── Emma (b2…05): favours drama and biography ─────────────────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000029"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000001"), score: 5.0), // Shawshank
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000030"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000012"), score: 5.0), // Schindler's List
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000031"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000005"), score: 4.5), // Forrest Gump
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000032"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000009"), score: 4.0), // Goodfellas
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000033"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000015"), score: 4.5), // Parasite
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000034"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000002"), score: 3.5), // Godfather
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000035"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000005"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000007"), score: 2.0), // The Matrix

        // ── Frank (b2…06): broad taste; watches most genres ──────────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000036"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000003"), score: 4.5), // Dark Knight
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000037"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000004"), score: 4.0), // Pulp Fiction
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000038"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000002"), score: 4.5), // Godfather
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000039"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000009"), score: 4.0), // Goodfellas
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000040"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 3.5), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000041"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000011"), score: 3.5), // Silence of Lambs
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000042"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000006"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000014"), score: 3.0), // Spirited Away

        // ── Grace (b2…07): loves animation, family, and foreign films ────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000043"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000014"), score: 5.0), // Spirited Away
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000044"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000015"), score: 5.0), // Parasite
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000045"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000005"), score: 4.5), // Forrest Gump
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000046"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000013"), score: 4.0), // LOTR
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000047"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000012"), score: 4.5), // Schindler's List
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000048"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000003"), score: 2.0), // Dark Knight
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000049"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000007"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000010"), score: 1.5), // Fight Club

        // ── Henry (b2…08): thriller and crime enthusiast ──────────────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000050"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000011"), score: 5.0), // Silence of Lambs
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000051"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000004"), score: 4.5), // Pulp Fiction
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000052"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000002"), score: 4.5), // Godfather
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000053"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000009"), score: 4.0), // Goodfellas
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000054"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000015"), score: 4.0), // Parasite
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000055"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000010"), score: 3.5), // Fight Club
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000056"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000008"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000014"), score: 2.0), // Spirited Away

        // ── Isabella (b2…09): balanced across drama and sci-fi ────────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000057"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000001"), score: 4.5), // Shawshank
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000058"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000008"), score: 4.5), // Interstellar
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000059"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 4.0), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000060"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000012"), score: 4.5), // Schindler's List
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000061"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000005"), score: 4.0), // Forrest Gump
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000062"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000013"), score: 3.5), // LOTR
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000063"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000009"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000004"), score: 3.0), // Pulp Fiction

        // ── James (b2…10): action fan; dislikes slow dramas ──────────────────────────────
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000064"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000003"), score: 5.0), // Dark Knight
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000065"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000007"), score: 5.0), // The Matrix
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000066"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000006"), score: 4.5), // Inception
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000067"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000010"), score: 4.0), // Fight Club
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000068"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000013"), score: 4.0), // LOTR
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000069"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000004"), score: 3.5), // Pulp Fiction
        new Rating(id: Guid.Parse("c3000000-0000-0000-0000-000000000070"), userId: Guid.Parse("b2000000-0000-0000-0000-000000000010"), movieId: Guid.Parse("a1000000-0000-0000-0000-000000000012"), score: 2.0), // Schindler's List
    }.AsReadOnly();
}
