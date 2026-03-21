/**
 * @fileoverview TanStack Query hook for fetching the full user list.
 */
import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import { fetchUsers } from '../services/userService'
import type { UserDto } from '../../types'

/**
 * Fetches and caches the list of all registered users.
 *
 * @returns A TanStack Query result containing an array of {@link UserDto}
 *   objects alongside standard `isLoading`, `isError`, and `error` flags.
 */
export function useUsers(): UseQueryResult<UserDto[], Error> {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })
}
