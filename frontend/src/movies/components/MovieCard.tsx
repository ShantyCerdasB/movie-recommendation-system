/**
 * @fileoverview Card component representing a single movie in the catalog grid.
 */
import { ImageOff } from 'lucide-react'
import { GenreBadge } from './GenreBadge'
import { formatYear } from '../../shared/utils/formatters'
import type { MovieDto } from '../../types'

/** Props accepted by the {@link MovieCard} component. */
interface MovieCardProps {
  /** The movie data to display. */
  movie: MovieDto
}

/**
 * Renders a movie's poster, title, genre, release year, and a trimmed
 * description inside a hoverable card surface.
 * Falls back to a placeholder icon when the poster URL is unavailable or
 * fails to load.
 *
 * @param props - {@link MovieCardProps}
 */
export function MovieCard({ movie }: MovieCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none'
    const placeholder = e.currentTarget.nextElementSibling as HTMLElement | null
    if (placeholder) placeholder.style.display = 'flex'
  }

  return (
    <article className="group flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md hover:border-indigo-700/60 hover:shadow-indigo-900/20 hover:shadow-lg transition-all duration-200">
      {/* Poster */}
      <div className="relative w-full h-48 bg-slate-800 overflow-hidden">
        {movie.posterUrl ? (
          <>
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              onError={handleImageError}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div
              className="hidden absolute inset-0 items-center justify-center bg-slate-800"
            >
              <ImageOff size={32} className="text-slate-600" />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageOff size={32} className="text-slate-600" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-100 leading-snug line-clamp-2">
            {movie.title}
          </h3>
          <span className="text-xs text-slate-500 shrink-0 mt-0.5">
            {formatYear(movie.releaseYear)}
          </span>
        </div>

        <GenreBadge genre={movie.genre} />

        {movie.description && (
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mt-1">
            {movie.description}
          </p>
        )}
      </div>
    </article>
  )
}
