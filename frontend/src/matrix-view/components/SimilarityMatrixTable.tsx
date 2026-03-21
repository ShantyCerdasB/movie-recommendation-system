/**
 * @fileoverview Scrollable heatmap table for the user–user cosine similarity matrix.
 */
import { cn } from '../../shared/utils/cn'
import type { SimilarityDto } from '../../types'

/** Props accepted by the {@link SimilarityMatrixTable} component. */
interface SimilarityMatrixTableProps {
  /** The similarity matrix data to render. */
  matrix: SimilarityDto
}

/**
 * Maps a cosine similarity value to a Tailwind background class.
 * Diagonal cells (value === 1.0 for self-similarity) are highlighted in indigo.
 * Off-diagonal cells transition from dark (low similarity) to medium blue (high similarity).
 *
 * @param value    - Cosine similarity in [0, 1].
 * @param isDiag   - Whether the cell lies on the matrix diagonal.
 * @returns A Tailwind class string for the cell background and text color.
 */
function similarityCellClass(value: number, isDiag: boolean): string {
  if (isDiag) return 'bg-indigo-600/40 text-indigo-200 font-semibold'
  if (value >= 0.8) return 'bg-indigo-900/60 text-indigo-300'
  if (value >= 0.6) return 'bg-indigo-900/40 text-indigo-400'
  if (value >= 0.4) return 'bg-indigo-900/20 text-indigo-500'
  if (value > 0) return 'bg-slate-800/60 text-slate-400'
  return 'bg-slate-800 text-slate-600'
}

/**
 * Renders a horizontally scrollable HTML table for the square user–user
 * cosine similarity matrix. Both row and column headers are the same set
 * of user names. Diagonal cells are highlighted in indigo to indicate
 * perfect self-similarity. Values are formatted to two decimal places.
 *
 * @param props - {@link SimilarityMatrixTableProps}
 */
export function SimilarityMatrixTable({ matrix }: SimilarityMatrixTableProps) {
  const { userNames, similarities } = matrix

  return (
    <div className="overflow-auto rounded-xl border border-slate-800">
      <table className="text-xs border-collapse min-w-full">
        <thead>
          <tr>
            <th className="sticky left-0 z-20 bg-slate-900 px-3 py-2 text-left text-slate-500 border-b border-r border-slate-800 font-medium min-w-[120px] whitespace-nowrap">
              User / User
            </th>
            {userNames.map((name) => (
              <th
                key={name}
                className="px-3 py-2 text-left font-medium text-slate-400 bg-slate-900 border-b border-slate-800 whitespace-nowrap"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {userNames.map((rowUser, i) => (
            <tr key={rowUser} className="hover:bg-slate-800/20 transition-colors">
              <td className="sticky left-0 z-10 bg-slate-900 px-3 py-2 font-medium text-slate-300 border-r border-slate-800 whitespace-nowrap">
                {rowUser}
              </td>
              {userNames.map((_, j) => {
                const value = similarities[i]?.[j] ?? 0
                const isDiag = i === j
                return (
                  <td
                    key={j}
                    className={cn(
                      'px-3 py-2 text-center tabular-nums whitespace-nowrap',
                      similarityCellClass(value, isDiag),
                    )}
                  >
                    {value.toFixed(2)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
