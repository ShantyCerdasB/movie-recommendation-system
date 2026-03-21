/**
 * @fileoverview Data-access functions for the movies feature.
 * Each function maps directly to a backend REST endpoint.
 */
import { get } from '../../services/httpClient'
import type { MovieDto } from '../../types'

/**
 * Fetches the complete movie catalog from the backend.
 *
 * @returns A promise resolving to an array of {@link MovieDto} objects.
 */
export async function fetchMovies(): Promise<MovieDto[]> {
  return get('/movies')
}

/**
 * Fetches a single movie by its unique identifier.
 *
 * @param id - The string representation of the movie's numeric ID.
 * @returns A promise resolving to the matching {@link MovieDto}.
 */
export async function fetchMovieById(id: string): Promise<MovieDto> {
  return get(`/movies/${id}`)
}
