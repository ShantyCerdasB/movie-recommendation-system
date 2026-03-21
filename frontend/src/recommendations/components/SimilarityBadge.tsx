/**
 * @fileoverview Color-coded badge that conveys a cosine similarity score at a glance.
 */
import { useTranslation } from 'react-i18next'
import { Badge } from '../../shared/components/ui'

/** Props accepted by the {@link SimilarityBadge} component. */
interface SimilarityBadgeProps {
  /**
   * Cosine similarity value in the range [0, 1].
   * Values are formatted as a percentage and colored by tier.
   */
  similarity: number
}

/**
 * Renders a {@link Badge} whose color reflects the strength of the similarity score:
 * - Green (`success`) for similarity >= 0.7
 * - Yellow (`warning`) for similarity in [0.4, 0.7)
 * - Gray (`default`) for similarity < 0.4
 *
 * @param props - {@link SimilarityBadgeProps}
 */
export function SimilarityBadge({ similarity }: SimilarityBadgeProps) {
  const { t } = useTranslation('common')
  const percentage = (similarity * 100).toFixed(1)

  let variant: 'success' | 'warning' | 'default'
  if (similarity >= 0.7) {
    variant = 'success'
  } else if (similarity >= 0.4) {
    variant = 'warning'
  } else {
    variant = 'default'
  }

  return (
    <Badge variant={variant}>
      {percentage}{t('similarity_match')}
    </Badge>
  )
}
