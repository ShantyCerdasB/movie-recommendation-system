/**
 * @fileoverview Concrete numerical walkthrough of cosine similarity computation.
 */
import { useTranslation } from 'react-i18next'
import { Card } from '../../shared/components/ui/Card'
import { FormulaBlock } from './FormulaBlock'

/** Hard-coded example data for the worked cosine similarity demonstration. */
const MOVIES = ['The Matrix', 'Inception', 'Parasite', 'Goodfellas', 'Interstellar']
const VECTOR_A = [5, 3, 0, 1, 4]
const VECTOR_B = [4, 0, 2, 1, 5]

/**
 * Computes the dot product of two numeric arrays of equal length.
 *
 * @param a - First vector.
 * @param b - Second vector.
 * @returns The scalar dot product.
 */
function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum, val, i) => sum + val * (b[i] ?? 0), 0)
}

/**
 * Computes the Euclidean (L2) norm of a numeric array.
 *
 * @param v - The input vector.
 * @returns The L2 norm.
 */
function norm(v: number[]): number {
  return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0))
}

const dot = dotProduct(VECTOR_A, VECTOR_B)
const normA = norm(VECTOR_A)
const normB = norm(VECTOR_B)
const cosine = dot / (normA * normB)

/**
 * Renders a self-contained academic worked example demonstrating how cosine
 * similarity is computed between two users' rating vectors. Shows the raw
 * vectors, step-by-step arithmetic, and the final interpreted result.
 */
export function WorkedExample() {
  const { t } = useTranslation('pages')

  return (
    <Card title={t('math_worked_title')} description={t('worked_subtitle')}>
      {/* Vector table */}
      <div className="overflow-x-auto mb-4">
        <table className="text-xs w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 text-slate-400 font-semibold">{t('worked_col_user')}</th>
              {MOVIES.map((m) => (
                <th key={m} className="px-3 py-2 text-slate-400 font-semibold whitespace-nowrap text-center">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr>
              <td className="py-2 pr-4 font-semibold text-slate-200">Alice (A)</td>
              {VECTOR_A.map((v, i) => (
                <td key={i} className="px-3 py-2 text-center tabular-nums text-indigo-300 font-medium">
                  {v === 0 ? <span className="text-slate-600">0</span> : v}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-4 font-semibold text-slate-200">Bob (B)</td>
              {VECTOR_B.map((v, i) => (
                <td key={i} className="px-3 py-2 text-center tabular-nums text-emerald-300 font-medium">
                  {v === 0 ? <span className="text-slate-600">0</span> : v}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Dot product */}
      <FormulaBlock
        formula={`A \u00b7 B = (${VECTOR_A.map((a, i) => `${a}\u00d7${VECTOR_B[i]}`).join(' + ')})
      = (${VECTOR_A.map((a, i) => a * (VECTOR_B[i] ?? 0)).join(' + ')})
      = ${dot}`}
        caption={t('worked_step1_caption')}
      />

      {/* Norms */}
      <FormulaBlock
        formula={`\u2016A\u2016 = \u221a(${VECTOR_A.map((v) => `${v}\u00b2`).join(' + ')}) = \u221a${VECTOR_A.reduce((s, v) => s + v * v, 0)} \u2248 ${normA.toFixed(4)}
\u2016B\u2016 = \u221a(${VECTOR_B.map((v) => `${v}\u00b2`).join(' + ')}) = \u221a${VECTOR_B.reduce((s, v) => s + v * v, 0)} \u2248 ${normB.toFixed(4)}`}
        caption={t('worked_step2_caption')}
      />

      {/* Final formula */}
      <FormulaBlock
        formula={`sim(Alice, Bob) = A \u00b7 B / (\u2016A\u2016 \u00d7 \u2016B\u2016)
                = ${dot} / (${normA.toFixed(4)} \u00d7 ${normB.toFixed(4)})
                = ${dot} / ${(normA * normB).toFixed(4)}
                \u2248 ${cosine.toFixed(3)}`}
        caption={t('worked_step3_caption')}
      />

      {/* Interpretation */}
      <div className="mt-2 bg-indigo-900/20 border border-indigo-800/50 rounded-lg px-4 py-3">
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-indigo-300">{t('worked_result_label')}</strong>{' '}
          {t('worked_result_text', {
            cosine: cosine.toFixed(3),
            percent: (cosine * 100).toFixed(1),
          })}
        </p>
      </div>
    </Card>
  )
}
