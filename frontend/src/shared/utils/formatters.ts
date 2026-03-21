/**
 * @fileoverview Pure formatting utilities for numeric and date values
 * displayed throughout the dashboard.
 */

/**
 * Formats a raw numeric score to two decimal places.
 *
 * @param score - The numeric score value (e.g. a predicted rating).
 * @returns A string representation fixed to two decimal places, e.g. `"4.25"`.
 */
export function formatScore(score: number): string {
  return score.toFixed(2)
}

/**
 * Formats a cosine similarity value (0–1) as a human-readable percentage.
 *
 * @param similarity - A value in the range [0, 1].
 * @returns A percentage string rounded to one decimal place, e.g. `"87.3%"`.
 */
export function formatSimilarity(similarity: number): string {
  return `${(similarity * 100).toFixed(1)}%`
}

/**
 * Converts a numeric release year to its string representation.
 *
 * @param year - Four-digit year integer, e.g. `2001`.
 * @returns The year as a plain string, e.g. `"2001"`.
 */
export function formatYear(year: number): string {
  return String(year)
}
