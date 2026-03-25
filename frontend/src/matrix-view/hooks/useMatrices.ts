/**
 * @fileoverview TanStack Query hooks for the ratings and similarity matrices.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchRatingMatrix, fetchSimilarityMatrix } from '../services/matrixService'
import type { MatrixDto, SimilarityDto } from '../../types'

/**
 * Fetches and caches the user–movie ratings matrix.
 *
 * @returns A TanStack Query result containing a {@link MatrixDto}.
 */
export function useRatingsMatrix(): UseQueryResult<MatrixDto, Error> {
  return useQuery({
    queryKey: ['matrix', 'ratings'],
    queryFn: fetchRatingMatrix,
  })
}

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
