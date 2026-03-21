/**
 * @fileoverview Data-access functions for the recommendations feature.
 */
import { get } from '../../services/httpClient'
import type { RecommendationDto } from '../../types'

/**
 * Fetches personalized movie recommendations for a given user.
 *
 * @param userId - The string representation of the user's numeric ID.
 * @param topN   - Optional maximum number of recommendations to return.
 * @returns A promise resolving to an ordered array of {@link RecommendationDto} objects.
 */
export async function fetchRecommendations(
  userId: string,
  topN?: number,
): Promise<RecommendationDto[]> {
  const query = topN !== undefined ? `?topN=${topN}` : ''
  return get(`/recommendations/${userId}${query}`)
}
