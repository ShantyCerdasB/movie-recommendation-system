/**
 * @fileoverview TanStack Query hook for fetching user-specific recommendations.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchRecommendations } from '../services/recommendationService'
import type { RecommendationDto } from '../../types'

/**
 * Fetches and caches personalized recommendations for the given user.
 * The query is disabled when `userId` is `null`.
 *
 * @param userId - The user's ID as a string, or `null` when no user is selected.
 * @param topN   - Optional maximum number of recommendations to return.
 * @returns A TanStack Query result containing an array of {@link RecommendationDto}.
 */
export function useRecommendations(
  userId: string | null,
  topN?: number,
): UseQueryResult<RecommendationDto[], Error> {
  return useQuery({
    queryKey: ['recommendations', userId, topN],
    queryFn: () => fetchRecommendations(userId!, topN),
    enabled: userId !== null,
  })
}
