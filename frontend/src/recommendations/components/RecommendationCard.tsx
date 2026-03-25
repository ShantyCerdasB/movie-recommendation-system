/**
 * @fileoverview Card component for a single recommendation result.
 */
import { Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '../../shared/components/ui'
import { localizeGenreList, localizeMovieTitle } from '../../shared/utils'
import { RecommendationScore } from './RecommendationScore'
import { SimilarityBadge } from './SimilarityBadge'
import type { RecommendationDto } from '../../types'

/** Props accepted by the {@link RecommendationCard} component. */
interface RecommendationCardProps {
  /** The recommendation data to display. */
  recommendation: RecommendationDto
  /** 1-based rank position of this recommendation in the list. */
  rank: number
}

/**
 * Renders a recommendation entry with rank indicator, poster image, movie title,
 * genre badge, predicted score bar, similarity badge, and an explanation string.
 * Applies a subtle indigo left border to reinforce the primary accent theme.
 *
 * @param props - {@link RecommendationCardProps}
 */
export function RecommendationCard({ recommendation, rank }: RecommendationCardProps) {
  const { t, i18n } = useTranslation('common')
  const { movieTitle, genre, posterUrl, predictedScore, similarityWeight, explanation } =
    recommendation
  const language = i18n.resolvedLanguage ?? i18n.language
  const localizedTitle = localizeMovieTitle(movieTitle, language)
  const localizedGenre = localizeGenreList(genre, language)
  const posterAlt = language.startsWith('es')
    ? `Poster de ${localizedTitle}`
    : `${localizedTitle} poster`

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-md border-l-4 border-l-indigo-600 overflow-hidden">
      <div className="px-5 py-4 flex gap-4">
        {/* Rank indicator */}
        <div className="flex items-start justify-center w-10 shrink-0 pt-0.5">
          <span className="text-2xl font-extrabold text-slate-600 leading-none select-none">
            {rank}
          </span>
        </div>

        {/* Poster thumbnail */}
        <div className="w-16 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={posterAlt}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.classList.add('fallback-poster')
                }
              }}
            />
          ) : (
            <Film size={24} className="text-slate-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-100 leading-snug">{localizedTitle}</h3>
            <Badge variant="info" className="shrink-0">
              {localizedGenre}
            </Badge>
          </div>

          <RecommendationScore score={predictedScore} label={t('predicted_score')} />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">{t('similarity')}</span>
            <SimilarityBadge similarity={similarityWeight} />
          </div>

          {explanation && (
            <p className="text-xs text-slate-400 italic leading-relaxed">
              {(() => {
                const m = explanation.match(/from (\d+) similar users \(avg\. similarity: ([\d.]+)\)/)
                if (m) return t('recommendation_explanation', { count: Number(m[1]), avg: m[2] })
                return explanation
              })()}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
