/**
 * @fileoverview TanStack Query hook for fetching a specific user's ratings.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchUserRatings } from '../services/userService'
import type { RatingDto } from '../../types'

/**
 * Fetches and caches the ratings submitted by a given user.
 * The query is disabled when `userId` is `null`, so the hook is safe to call
 * before a user has been selected.
 *
 * @param userId - The user's ID as a string, or `null` when no user is selected.
 * @returns A TanStack Query result containing an array of {@link RatingDto}
 *   objects alongside standard `isLoading`, `isError`, and `error` flags.
 */
export function useUserRatings(userId: string | null): UseQueryResult<RatingDto[], Error> {
  return useQuery({
    queryKey: ['userRatings', userId],
    queryFn: () => fetchUserRatings(userId!),
    enabled: userId !== null,
  })
}
