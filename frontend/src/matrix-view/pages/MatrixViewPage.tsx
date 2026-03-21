/**
 * @fileoverview Matrix View feature page.
 * @description Renders the raw user–movie ratings matrix and the derived user–user
 * cosine similarity matrix, toggled via tab controls.
 */
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../shared/components/PageHeader'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { Card } from '../../shared/components/ui/Card'
import { useRatingMatrix } from '../hooks/useRatingMatrix'
import { useSimilarityMatrix } from '../hooks/useSimilarityMatrix'
import { MatrixControls } from '../components/MatrixControls'
import { RatingMatrixTable } from '../components/RatingMatrixTable'
import { SimilarityMatrixTable } from '../components/SimilarityMatrixTable'
import { MatrixLegend } from '../components/MatrixLegend'
import type { MatrixTab } from '../components/MatrixControls'

/**
 * Full-page view showing either the ratings matrix or the similarity matrix,
 * selectable via tab controls. Each view is independently fetched and cached.
 */
export default function MatrixViewPage() {
  const { t } = useTranslation('pages')
  const [activeTab, setActiveTab] = useState<MatrixTab>('ratings')

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
              ? 'Loading ratings matrix…'
              : 'Loading similarity matrix…'
          }
        />
      )}

      {isError && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 px-5 py-4 mb-6">
          <p className="text-sm text-red-400">
            Failed to load the {activeTab === 'ratings' ? 'ratings' : 'similarity'} matrix.
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
            title="About the Similarity Matrix"
            description="How to interpret the values in this table"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Each cell S[i][j] holds the{' '}
              <strong className="text-slate-100">cosine similarity</strong> between user{' '}
              <em>i</em> and user <em>j</em>, computed from their respective rating vectors.
              Values range from{' '}
              <span className="text-slate-200 font-medium">0.00</span> (no overlapping taste)
              to{' '}
              <span className="text-indigo-300 font-medium">1.00</span> (identical taste profile).
              The diagonal is always <span className="text-indigo-300 font-medium">1.00</span>{' '}
              because every user is perfectly similar to themselves.
              Darker indigo cells indicate stronger similarity and contribute more weight
              to the collaborative filtering prediction step.
            </p>
          </Card>
        </div>
      )}

      <div className="mt-8">
        <Card
          title={t('matrix_overview_title')}
          description="A brief guide to both matrix types"
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
