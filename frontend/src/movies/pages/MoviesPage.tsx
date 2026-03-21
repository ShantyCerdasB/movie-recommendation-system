/**
 * @fileoverview Movies feature page. Displays the full movie catalog in a
 * responsive grid with count information in the page header.
 */
import { Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../shared/components/PageHeader'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { EmptyState } from '../../shared/components/EmptyState'
import { ErrorBoundary } from '../../shared/components/ErrorBoundary'
import { Badge } from '../../shared/components/ui/Badge'
import { useMovies } from '../hooks/useMovies'
import { MovieGrid } from '../components/MovieGrid'

/**
 * Full-page view for the movies section.
 * Handles loading, error, and empty states before rendering the catalog grid.
 */
export default function MoviesPage() {
  const { t } = useTranslation('pages')
  const { data: movies, isLoading, isError, error } = useMovies()

  return (
    <ErrorBoundary>
      <PageHeader
        title={t('movies_title')}
        description={t('movies_desc')}
      >
        {movies && (
          <Badge variant="info">{movies.length} titles</Badge>
        )}
      </PageHeader>

      {isLoading && <LoadingSpinner message="Loading movie catalog…" />}

      {isError && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 px-5 py-4">
          <p className="text-sm text-red-400">
            {error?.message ?? 'Failed to load movies. Please try again.'}
          </p>
        </div>
      )}

      {!isLoading && !isError && movies && movies.length === 0 && (
        <EmptyState
          title="No movies found"
          description="The catalog is currently empty. Add some movies via the backend to get started."
          icon={<Film size={40} />}
        />
      )}

      {!isLoading && !isError && movies && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
    </ErrorBoundary>
  )
}
