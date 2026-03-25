/**
 * @fileoverview Genre-aware badge that maps known genre strings to
 * semantically meaningful color variants.
 */
import { useTranslation } from 'react-i18next'
import { Badge } from '../../shared/components/ui/Badge'
import { localizeGenreList } from '../../shared/utils'
import type { BadgeVariant } from './GenreBadge.types'

/** Maps genre name strings to {@link BadgeVariant} color schemes. */
const genreVariantMap: Record<string, BadgeVariant> = {
  Action:    'danger',
  Adventure: 'warning',
  Comedy:    'success',
  Drama:     'info',
  Horror:    'danger',
  Romance:   'success',
  'Sci-Fi':  'info',
  Thriller:  'warning',
  Animation: 'success',
  Fantasy:   'info',
  Mystery:   'warning',
  Crime:     'danger',
}

/** Props accepted by the {@link GenreBadge} component. */
interface GenreBadgeProps {
  /** The genre label to display and use for color mapping. */
  genre: string
}

/**
 * Renders a colored {@link Badge} whose variant is derived from the
 * provided genre string. Falls back to the `'default'` variant for
 * unrecognized genres.
 *
 * @param props - {@link GenreBadgeProps}
 */
export function GenreBadge({ genre }: GenreBadgeProps) {
  const { i18n } = useTranslation()
  const variant = genreVariantMap[genre] ?? 'default'
  return (
    <Badge variant={variant}>
      {localizeGenreList(genre, i18n.resolvedLanguage ?? i18n.language)}
    </Badge>
  )
}
