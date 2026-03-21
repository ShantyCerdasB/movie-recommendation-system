/**
 * @fileoverview Visual score indicator used to display a predicted rating value.
 */

/** Props accepted by the {@link RecommendationScore} component. */
interface RecommendationScoreProps {
  /**
   * Numeric score in the range [0, 5].
   * Values outside this range are clamped for display purposes.
   */
  score: number
  /** Optional label rendered above the score value. */
  label?: string
}

/**
 * Displays a numeric score prominently alongside a filled horizontal bar
 * whose width represents the score as a fraction of the maximum (5.0).
 *
 * @param props - {@link RecommendationScoreProps}
 */
export function RecommendationScore({ score, label }: RecommendationScoreProps) {
  const clamped = Math.min(Math.max(score, 0), 5)
  const percentage = (clamped / 5) * 100

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-xs text-slate-400">{label}</span>
      )}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-indigo-400 tabular-nums w-8 shrink-0">
          {clamped.toFixed(1)}
        </span>
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}
