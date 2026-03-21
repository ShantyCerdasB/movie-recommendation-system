/**
 * @fileoverview TanStack Query hook for fetching the full movie catalog.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchMovies } from '../services/movieService'
import type { MovieDto } from '../../types'

/**
 * Fetches and caches the complete list of movies from the API.
 *
 * @returns A TanStack Query result containing an array of {@link MovieDto}
 *   objects alongside standard `isLoading`, `isError`, and `error` flags.
 */
export function useMovies(): UseQueryResult<MovieDto[], Error> {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  })
}
