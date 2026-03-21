/**
 * @fileoverview Scrollable heatmap table for the user–movie ratings matrix.
 */
import { cn } from '../../shared/utils/cn'
import type { MatrixDto } from '../../types'

/** Props accepted by the {@link RatingMatrixTable} component. */
interface RatingMatrixTableProps {
  /** The ratings matrix data to render. */
  matrix: MatrixDto
}

/**
 * Maps a numeric rating value to a Tailwind background class for heatmap coloring.
 * Unrated cells (0) receive a dark gray background; rated cells are colored
 * on a red-to-green spectrum reflecting the quality of the rating.
 *
 * @param value - Rating value (0 = unrated, 1–5 = rated).
 * @returns A Tailwind class string for the cell background.
 */
function ratingCellClass(value: number): string {
  if (value === 0) return 'bg-slate-800 text-slate-600'
  if (value <= 2) return 'bg-red-900/50 text-red-300'
  if (value === 3) return 'bg-amber-900/50 text-amber-300'
  return 'bg-emerald-900/50 text-emerald-300'
}

/**
 * Renders a horizontally scrollable, heatmap-styled HTML table for the
 * user–movie ratings matrix. The first column (user names) and the header
 * row are sticky so that labels remain visible while scrolling.
 *
 * @param props - {@link RatingMatrixTableProps}
 */
export function RatingMatrixTable({ matrix }: RatingMatrixTableProps) {
  const { userNames, movieTitles, ratings } = matrix

  return (
    <div className="overflow-auto rounded-xl border border-slate-800">
      <table className="text-xs border-collapse min-w-full">
        <thead>
          <tr>
            <th className="sticky left-0 z-20 bg-slate-900 px-3 py-2 text-left text-slate-500 border-b border-r border-slate-800 font-medium min-w-[120px] whitespace-nowrap">
              User / Movie
            </th>
            {movieTitles.map((title) => (
              <th
                key={title}
                className="px-3 py-2 text-left font-medium text-slate-400 bg-slate-900 border-b border-slate-800 whitespace-nowrap"
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {userNames.map((user, i) => (
            <tr key={user} className="hover:bg-slate-800/20 transition-colors">
              <td className="sticky left-0 z-10 bg-slate-900 px-3 py-2 font-medium text-slate-300 border-r border-slate-800 whitespace-nowrap">
                {user}
              </td>
              {movieTitles.map((_, j) => {
                const value = ratings[i]?.[j] ?? 0
                return (
                  <td
                    key={j}
                    className={cn(
                      'px-3 py-2 text-center tabular-nums whitespace-nowrap font-medium',
                      ratingCellClass(value),
                    )}
                  >
                    {value === 0 ? '—' : value}
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
