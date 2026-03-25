/**
 * @fileoverview Table listing all ratings submitted by a specific user,
 * with movie title lookup and a visual score display.
 */
import { Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '../../shared/components/EmptyState'
import { Card } from '../../shared/components/ui/Card'
import { localizeGenreList, localizeMovieTitle } from '../../shared/utils'
import type { MovieDto, RatingDto } from '../../types'

/** Props accepted by the {@link UserRatingsList} component. */
interface UserRatingsListProps {
  /** Array of rating records for the selected user. */
  ratings: RatingDto[]
  /** Full movie catalog used to resolve movie titles from IDs. */
  movies: MovieDto[]
}

/**
 * Renders a table of a user's submitted ratings.
 * Each row shows the movie title (resolved from `movies`) and the numeric
 * score accompanied by filled star icons for quick visual scanning.
 *
 * @param props - {@link UserRatingsListProps}
 */
export function UserRatingsList({ ratings, movies }: UserRatingsListProps) {
  const { t, i18n } = useTranslation('common')
  const language = i18n.resolvedLanguage ?? i18n.language
  const unknownMovieLabel = (movieId: RatingDto['movieId']) =>
    language.startsWith('es') ? `Pelicula #${movieId}` : `Movie #${movieId}`

  if (ratings.length === 0) {
    return (
      <EmptyState
        title={t('no_ratings_title')}
        description={t('no_ratings_desc')}
        icon={<Star size={36} />}
      />
    )
  }

  const movieMap = new Map(movies.map((movie) => [movie.id, movie]))

  return (
    <Card title={t('ratings_title')} description={t('ratings_desc')}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('col_movie')}
              </th>
              <th className="text-left py-2 pr-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('col_genre')}
              </th>
              <th className="text-left py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t('col_score')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {ratings.map((rating) => {
              const movie = movieMap.get(rating.movieId)

              return (
                <tr key={rating.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 pr-4 font-medium text-slate-200">
                    {movie
                      ? localizeMovieTitle(movie.title, language)
                      : unknownMovieLabel(rating.movieId)}
                  </td>
                  <td className="py-3 pr-4 text-slate-400">
                    {movie ? localizeGenreList(movie.genre, language) : '-'}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-100 font-semibold w-4">
                        {rating.score}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            size={13}
                            className={
                              index < rating.score
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-700'
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
