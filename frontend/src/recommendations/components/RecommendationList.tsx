/**
 * @fileoverview Ordered list of recommendation cards with a summary count header.
 */
import { useTranslation } from 'react-i18next'
import { RecommendationCard } from './RecommendationCard'
import type { RecommendationDto } from '../../types'

/** Props accepted by the {@link RecommendationList} component. */
interface RecommendationListProps {
  /** Ordered array of recommendations to render; the first element is rank 1. */
  recommendations: RecommendationDto[]
}

/**
 * Renders a labeled list of {@link RecommendationCard} elements, one per recommendation.
 * A count header at the top communicates the total number of results at a glance.
 *
 * @param props - {@link RecommendationListProps}
 */
export function RecommendationList({ recommendations }: RecommendationListProps) {
  const { t } = useTranslation('common')

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-slate-400">
        <span className="text-slate-200 font-semibold">{recommendations.length}</span>{' '}
        {recommendations.length === 1
          ? t('movies_recommended_one')
          : t('movies_recommended_other')}
      </p>
      {recommendations.map((rec, index) => (
        <RecommendationCard key={rec.movieId} recommendation={rec} rank={index + 1} />
      ))}
    </div>
  )
}
