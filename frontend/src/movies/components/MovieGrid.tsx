/**
 * @fileoverview Responsive grid layout that renders a {@link MovieCard} for
 * each movie in the provided array.
 */
import { MovieCard } from './MovieCard'
import type { MovieDto } from '../../types'

/** Props accepted by the {@link MovieGrid} component. */
interface MovieGridProps {
  /** The movies to render as cards within the grid. */
  movies: MovieDto[]
}

/**
 * Lays out an array of movies in a responsive multi-column grid.
 * The column count adapts from one column on mobile up to four on wide viewports.
 *
 * @param props - {@link MovieGridProps}
 */
export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
