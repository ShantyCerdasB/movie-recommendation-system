/**
 * @fileoverview TanStack Query hook for fetching the user–movie ratings matrix.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchRatingMatrix } from '../services/matrixService'
import type { MatrixDto } from '../../types'

/**
 * Fetches and caches the user–movie ratings matrix.
 *
 * @returns A TanStack Query result containing a {@link MatrixDto}.
 */
export function useRatingMatrix(): UseQueryResult<MatrixDto, Error> {
  return useQuery({
    queryKey: ['matrix', 'ratings'],
    queryFn: fetchRatingMatrix,
  })
}
