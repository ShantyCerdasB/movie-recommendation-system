/**
 * @fileoverview Matrix View feature page.
 * @description Renders the raw user-movie ratings matrix and the derived user-user
 * cosine similarity matrix, toggled via tab controls.
 */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { PageHeader } from '../../shared/components/PageHeader'
import { Card } from '../../shared/components/ui/Card'
import { MatrixControls } from '../components/MatrixControls'
import type { MatrixTab } from '../components/MatrixControls'
import { MatrixLegend } from '../components/MatrixLegend'
import { RatingMatrixTable } from '../components/RatingMatrixTable'
import { SimilarityMatrixTable } from '../components/SimilarityMatrixTable'
import { useRatingMatrix } from '../hooks/useRatingMatrix'
import { useSimilarityMatrix } from '../hooks/useSimilarityMatrix'

/**
 * Full-page view showing either the ratings matrix or the similarity matrix,
 * selectable via tab controls. Each view is independently fetched and cached.
 */
export default function MatrixViewPage() {
  const { t, i18n } = useTranslation('pages')
  const [activeTab, setActiveTab] = useState<MatrixTab>('ratings')
  const isSpanish = (i18n.resolvedLanguage ?? i18n.language).startsWith('es')
  const copy = isSpanish
    ? {
        loadingRatings: 'Cargando matriz de valoraciones...',
        loadingSimilarity: 'Cargando matriz de similitud...',
        errorRatings: 'Error al cargar la matriz de valoraciones.',
        errorSimilarity: 'Error al cargar la matriz de similitud.',
        similarityTitle: 'Acerca de la matriz de similitud',
        similarityDescription: 'Como interpretar los valores de esta tabla',
        similarityBody:
          'Cada celda S[i][j] contiene la similitud coseno entre el usuario i y el usuario j, calculada a partir de sus respectivos vectores de valoracion. Los valores van de 0.00 (sin afinidad de gustos) a 1.00 (perfil de gustos identico). La diagonal siempre es 1.00 porque cada usuario es perfectamente similar a si mismo. Las celdas indigo mas oscuras indican una similitud mayor y aportan mas peso en el paso de prediccion del filtrado colaborativo.',
        overviewDescription: 'Una guia breve de ambos tipos de matriz',
      }
    : {
        loadingRatings: 'Loading ratings matrix...',
        loadingSimilarity: 'Loading similarity matrix...',
        errorRatings: 'Failed to load the ratings matrix.',
        errorSimilarity: 'Failed to load the similarity matrix.',
        similarityTitle: 'About the Similarity Matrix',
        similarityDescription: 'How to interpret the values in this table',
        similarityBody:
          'Each cell S[i][j] holds the cosine similarity between user i and user j, computed from their respective rating vectors. Values range from 0.00 (no overlapping taste) to 1.00 (identical taste profile). The diagonal is always 1.00 because every user is perfectly similar to themselves. Darker indigo cells indicate stronger similarity and contribute more weight to the collaborative filtering prediction step.',
        overviewDescription: 'A brief guide to both matrix types',
      }

  const {
    data: ratingMatrix,
    isLoading: ratingLoading,
    isError: ratingError,
  } = useRatingMatrix()

  const {
    data: similarityMatrix,
    isLoading: similarityLoading,
    isError: similarityError,
  } = useSimilarityMatrix()

  const isLoading = activeTab === 'ratings' ? ratingLoading : similarityLoading
  const isError = activeTab === 'ratings' ? ratingError : similarityError

  return (
    <div>
      <PageHeader
        title={t('matrix_title')}
        description={t('matrix_desc')}
      />

      <MatrixControls activeTab={activeTab} onTabChange={setActiveTab} />

      {isLoading && (
        <LoadingSpinner
          message={
            activeTab === 'ratings'
              ? copy.loadingRatings
              : copy.loadingSimilarity
          }
        />
      )}

      {isError && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 px-5 py-4 mb-6">
          <p className="text-sm text-red-400">
            {activeTab === 'ratings'
              ? copy.errorRatings
              : copy.errorSimilarity}
          </p>
        </div>
      )}

      {activeTab === 'ratings' && !ratingLoading && !ratingError && ratingMatrix && (
        <div className="flex flex-col gap-4">
          <RatingMatrixTable matrix={ratingMatrix} />
          <MatrixLegend />
        </div>
      )}

      {activeTab === 'similarity' && !similarityLoading && !similarityError && similarityMatrix && (
        <div className="flex flex-col gap-6">
          <SimilarityMatrixTable matrix={similarityMatrix} />
          <Card
            title={copy.similarityTitle}
            description={copy.similarityDescription}
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              {copy.similarityBody}
            </p>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <Card
          title={t('matrix_overview_title')}
          description={copy.overviewDescription}
        >
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="font-semibold text-slate-200 mb-1">{t('matrix_ratings_label')}</dt>
              <dd className="text-slate-400 leading-relaxed">
                {t('matrix_ratings_desc')}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-200 mb-1">{t('matrix_similarity_label')}</dt>
              <dd className="text-slate-400 leading-relaxed">
                {t('matrix_similarity_desc')}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
