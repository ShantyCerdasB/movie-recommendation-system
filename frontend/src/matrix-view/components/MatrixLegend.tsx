/**
 * @fileoverview Color-scale legend for the ratings matrix heatmap.
 */

/**
 * Renders a horizontal gradient bar with labeled anchor points explaining
 * how cell colors correspond to rating values in the heatmap.
 */
export function MatrixLegend() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-4">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
        Color Scale
      </p>
      <div
        className="h-4 rounded-md mb-3"
        style={{
          background:
            'linear-gradient(to right, #1e293b 0%, #7f1d1d 25%, #ca8a04 55%, #166534 100%)',
        }}
      />
      <div className="flex justify-between text-xs text-slate-400">
        <span>0 = Not rated</span>
        <span>1 = Poor</span>
        <span>3 = Average</span>
        <span>5 = Excellent</span>
      </div>
    </div>
  )
}
