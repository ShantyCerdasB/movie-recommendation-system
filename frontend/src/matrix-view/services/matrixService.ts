/**
 * @fileoverview Data-access functions for the matrix-view feature.
 */
import { get } from '../../services/httpClient'
import type { MatrixDto, SimilarityDto } from '../../types'

/**
 * Fetches the raw user–movie ratings matrix from the backend.
 *
 * @returns A promise resolving to a {@link MatrixDto} containing row/column
 *   labels and the 2D ratings array.
 */
export async function fetchRatingMatrix(): Promise<MatrixDto> {
  return get('/matrix/ratings')
}

/**
 * Fetches the computed user–user cosine similarity matrix from the backend.
 *
 * @returns A promise resolving to a {@link SimilarityDto} containing user
 *   labels and the 2D similarity score array.
 */
export async function fetchSimilarityMatrix(): Promise<SimilarityDto> {
  return get('/matrix/similarity')
}
