/**
 * @fileoverview Centered placeholder displayed when a list or data set is empty.
 */

/** Props accepted by the {@link EmptyState} component. */
interface EmptyStateProps {
  /** Primary heading conveying what is missing. */
  title: string
  /** Optional supporting text with further context or instructions. */
  description?: string
  /** Optional icon element rendered above the title. */
  icon?: React.ReactNode
}

/**
 * Full-width centered layout for zero-data situations.
 * Accepts an optional icon slot, a required title, and an optional description.
 *
 * @param props - {@link EmptyStateProps}
 */
export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {icon && (
        <div className="mb-4 text-slate-500">{icon}</div>
      )}
      <h3 className="text-lg font-semibold text-slate-300">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-slate-500 max-w-sm">{description}</p>
      )}
    </div>
  )
}
