/**
 * @fileoverview Generic scrollable matrix table used to render both the
 * ratings matrix and the similarity matrix.
 */
import { cn } from '../../shared/utils/cn'

/** Props accepted by the {@link MatrixTable} component. */
interface MatrixTableProps {
  /** Labels for the table columns (corresponds to matrix column indices). */
  columnLabels: string[]
  /** Labels for the table rows (corresponds to matrix row indices). */
  rowLabels: string[]
  /** 2D array of numeric values; `values[i][j]` populates row i, column j. */
  values: number[][]
  /** Custom cell formatter. Defaults to rounding to 2 decimal places. */
  formatCell?: (value: number) => string
  /**
   * Returns a CSS class string for a cell based on its value.
   * Used to apply heat-map coloring.
   */
  cellClassName?: (value: number) => string
}

const defaultFormat = (v: number) => (v === 0 ? '—' : v.toFixed(2))

/**
 * Renders a horizontally scrollable HTML table for 2D numeric data.
 * Row and column headers are sticky for readability on large matrices.
 *
 * @param props - {@link MatrixTableProps}
 */
export function MatrixTable({
  columnLabels,
  rowLabels,
  values,
  formatCell = defaultFormat,
  cellClassName,
}: MatrixTableProps) {
  return (
    <div className="overflow-auto rounded-xl border border-slate-800">
      <table className="text-xs border-collapse min-w-full">
        <thead>
          <tr>
            {/* Top-left corner cell */}
            <th className="sticky left-0 z-20 bg-slate-900 px-3 py-2 text-left text-slate-500 border-b border-r border-slate-800 font-medium min-w-[120px]">
              User / Movie
            </th>
            {columnLabels.map((col) => (
              <th
                key={col}
                className="px-3 py-2 text-left font-medium text-slate-400 bg-slate-900 border-b border-slate-800 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {rowLabels.map((row, i) => (
            <tr key={row} className="hover:bg-slate-800/30 transition-colors">
              <td className="sticky left-0 z-10 bg-slate-900 px-3 py-2 font-medium text-slate-300 border-r border-slate-800 whitespace-nowrap">
                {row}
              </td>
              {columnLabels.map((_, j) => {
                const val = values[i]?.[j] ?? 0
                return (
                  <td
                    key={j}
                    className={cn(
                      'px-3 py-2 text-center tabular-nums whitespace-nowrap',
                      val === 0 ? 'text-slate-600' : 'text-slate-200',
                      cellClassName ? cellClassName(val) : '',
                    )}
                  >
                    {formatCell(val)}
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
