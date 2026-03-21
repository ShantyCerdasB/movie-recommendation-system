/**
 * @fileoverview Data-access functions for the users feature.
 * Each function maps directly to a backend REST endpoint.
 */
import { get } from '../../services/httpClient'
import type { UserDto, RatingDto } from '../../types'

/**
 * Fetches the full list of registered users.
 *
 * @returns A promise resolving to an array of {@link UserDto} objects.
 */
export async function fetchUsers(): Promise<UserDto[]> {
  return get('/users')
}

/**
 * Fetches a single user by their unique identifier.
 *
 * @param id - The string representation of the user's numeric ID.
 * @returns A promise resolving to the matching {@link UserDto}.
 */
export async function fetchUserById(id: string): Promise<UserDto> {
  return get(`/users/${id}`)
}

/**
 * Fetches all ratings submitted by a specific user.
 *
 * @param userId - The string representation of the user's numeric ID.
 * @returns A promise resolving to an array of {@link RatingDto} objects.
 */
export async function fetchUserRatings(userId: string): Promise<RatingDto[]> {
  return get(`/ratings/user/${userId}`)
}
