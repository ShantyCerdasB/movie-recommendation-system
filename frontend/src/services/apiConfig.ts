/**
 * @fileoverview Centralized API configuration constants.
 */

/**
 * Base URL for all API requests. Reads from the `VITE_API_URL` environment
 * variable and falls back to the Vite dev-server proxy path `/v1`.
 */
export const API_BASE = (import.meta.env.VITE_API_URL as string | undefined) ?? '/v1'
