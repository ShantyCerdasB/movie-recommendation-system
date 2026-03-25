/**
 * @fileoverview Movies feature page. Displays the full movie catalog in a
 * responsive grid with count information in the page header.
 */
import { Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { EmptyState } from '../../shared/components/EmptyState'
import { ErrorBoundary } from '../../shared/components/ErrorBoundary'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { PageHeader } from '../../shared/components/PageHeader'
import { Badge } from '../../shared/components/ui/Badge'
import { MovieGrid } from '../components/MovieGrid'
import { useMovies } from '../hooks/useMovies'

/**
 * Full-page view for the movies section.
 * Handles loading, error, and empty states before rendering the catalog grid.
 */
export default function MoviesPage() {
  const { t, i18n } = useTranslation('pages')
  const { data: movies, isLoading, isError, error } = useMovies()
  const isSpanish = (i18n.resolvedLanguage ?? i18n.language).startsWith('es')
  const copy = isSpanish
    ? {
        count: (count: number) => `${count} titulos`,
        loading: 'Cargando catalogo de peliculas...',
        error: 'Error al cargar las peliculas. Intenta de nuevo.',
        emptyTitle: 'No se encontraron peliculas',
        emptyDescription: 'El catalogo esta vacio. Agrega peliculas desde el backend para comenzar.',
      }
    : {
        count: (count: number) => `${count} titles`,
        loading: 'Loading movie catalog...',
        error: 'Failed to load movies. Please try again.',
        emptyTitle: 'No movies found',
        emptyDescription: 'The catalog is currently empty. Add some movies via the backend to get started.',
      }

  return (
    <ErrorBoundary>
      <PageHeader
        title={t('pages:movies_title')}
        description={t('pages:movies_desc')}
      >
        {movies && (
          <Badge variant="info">{copy.count(movies.length)}</Badge>
        )}
      </PageHeader>

      {isLoading && <LoadingSpinner message={copy.loading} />}

      {isError && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 px-5 py-4">
          <p className="text-sm text-red-400">
            {error?.message ?? copy.error}
          </p>
        </div>
      )}

      {!isLoading && !isError && movies && movies.length === 0 && (
        <EmptyState
          title={copy.emptyTitle}
          description={copy.emptyDescription}
          icon={<Film size={40} />}
        />
      )}

      {!isLoading && !isError && movies && movies.length > 0 && (
        <MovieGrid movies={movies} />
      )}
    </ErrorBoundary>
  )
}
