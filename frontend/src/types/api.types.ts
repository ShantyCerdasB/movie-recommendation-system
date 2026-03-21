/**
 * @fileoverview Shared API data transfer object definitions used across all features.
 * These interfaces mirror the backend response shapes exactly.
 */

/**
 * Generic API envelope returned by every backend endpoint.
 * @template T - The shape of the payload contained in `data`.
 */
export interface ApiResponse<T> {
  /** Whether the operation completed without errors. */
  success: boolean
  /** Human-readable status message from the server. */
  message: string
  /** The actual response payload. */
  data: T
}

/**
 * Represents a single movie entry in the catalog.
 */
export interface MovieDto {
  /** Unique numeric identifier for the movie. */
  id: number
  /** Full display title of the movie. */
  title: string
  /** Genre category string (e.g. "Action", "Drama"). */
  genre: string
  /** Four-digit year the movie was released. */
  releaseYear: number
  /** URL pointing to the movie's poster image. */
  posterUrl: string
  /** Short synopsis or description of the movie. */
  description: string
}

/**
 * Represents a registered user in the system.
 */
export interface UserDto {
  /** Unique numeric identifier for the user. */
  id: number
  /** Display name of the user. */
  name: string
}

/**
 * Represents a single rating record linking a user to a movie.
 */
export interface RatingDto {
  /** Unique numeric identifier for the rating record. */
  id: number
  /** Identifier of the user who submitted the rating. */
  userId: number
  /** Identifier of the movie that was rated. */
  movieId: number
  /** Numeric score given by the user (typically 1–5). */
  score: number
}

/**
 * Payload shape for submitting a new rating.
 */
export interface CreateRatingDto {
  /** Identifier of the user submitting the rating. */
  userId: number
  /** Identifier of the movie being rated. */
  movieId: number
  /** Numeric score to assign (typically 1–5). */
  score: number
}

/**
 * A single recommendation entry produced by the collaborative filtering algorithm.
 */
export interface RecommendationDto {
  /** Identifier of the recommended movie. */
  movieId: number
  /** Display title of the recommended movie. */
  movieTitle: string
  /** Genre of the recommended movie. */
  genre: string
  /** URL pointing to the recommended movie's poster image. */
  posterUrl: string
  /** Score predicted by the linear algebra model for this user-movie pair. */
  predictedScore: number
  /** Cosine similarity weight derived from the user-similarity matrix. */
  similarityWeight: number
  /** Human-readable explanation of why this movie was recommended. */
  explanation: string
}

/**
 * The raw user–movie ratings matrix used as input to the algorithm.
 */
export interface MatrixDto {
  /** Ordered list of user display names corresponding to matrix rows. */
  userNames: string[]
  /** Ordered list of movie titles corresponding to matrix columns. */
  movieTitles: string[]
  /** 2D array of ratings; `ratings[i][j]` is user i's score for movie j, or 0 if unrated. */
  ratings: number[][]
}

/**
 * The computed user–user cosine similarity matrix.
 */
export interface SimilarityDto {
  /** Ordered list of user display names for both rows and columns. */
  userNames: string[]
  /** 2D array where `similarities[i][j]` is the cosine similarity between user i and user j. */
  similarities: number[][]
}
