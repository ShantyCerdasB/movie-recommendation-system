/**
 * @fileoverview Type definitions for the math explanation feature.
 * @description No SVD is used — this module covers cosine similarity and collaborative filtering theory.
 */

/** Represents a step in the mathematical explanation walkthrough. */
export interface MathStep {
  /** Step number displayed to the user. */
  number: number
  /** Short heading for the step. */
  title: string
  /** Full explanation paragraph. */
  description: string
  /** Optional formula string displayed in a formula block. */
  formula?: string
  /** Optional example or note. */
  example?: string
}
