/**
 * @fileoverview TanStack Query hook for fetching the user–user cosine similarity matrix.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchSimilarityMatrix } from '../services/matrixService'
import type { SimilarityDto } from '../../types'

/**
 * Fetches and caches the user–user cosine similarity matrix.
 *
 * @returns A TanStack Query result containing a {@link SimilarityDto}.
 */
export function useSimilarityMatrix(): UseQueryResult<SimilarityDto, Error> {
  return useQuery({
    queryKey: ['matrix', 'similarity'],
    queryFn: fetchSimilarityMatrix,
  })
}
