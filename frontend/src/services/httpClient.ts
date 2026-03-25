/**
 * @fileoverview Typed HTTP client wrapper around the Fetch API.
 * All requests are directed at the configured API base URL and responses
 * are deserialized as JSON. Non-2xx responses are converted to thrown errors.
 */
import { beginNetworkActivity, endNetworkActivity } from '../app/store/networkActivity'

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '/v1'

async function request<T>(path: string, init: RequestInit, method: 'GET' | 'POST'): Promise<T> {
  beginNetworkActivity()

  try {
    const response = await fetch(`${BASE_URL}${path}`, init)

    if (!response.ok) {
      throw new Error(`${method} ${path} failed: ${response.status} ${response.statusText}`)
    }

    return response.json() as Promise<T>
  } finally {
    endNetworkActivity()
  }
}

/**
 * Constructs a full URL from the given path and sends a GET request.
 * Throws an {@link Error} when the server responds with a non-ok status.
 *
 * @template T - Expected shape of the deserialized response body.
 * @param path - API path segment, e.g. `'/movies'` or `'/users/1'`.
 * @returns A promise that resolves to the parsed response body.
 */
export async function get<T>(path: string): Promise<T> {
  return request<T>(
    path,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
    'GET',
  )
}

/**
 * Constructs a full URL from the given path, serializes `body` to JSON,
 * and sends a POST request.
 * Throws an {@link Error} when the server responds with a non-ok status.
 *
 * @template T - Expected shape of the deserialized response body.
 * @param path - API path segment, e.g. `'/ratings'`.
 * @param body - Request payload to serialize as JSON.
 * @returns A promise that resolves to the parsed response body.
 */
export async function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(
    path,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    'POST',
  )
}
