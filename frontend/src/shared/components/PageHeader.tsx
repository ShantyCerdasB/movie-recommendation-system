/**
 * @fileoverview Standardized page-level header with a title, optional
 * description, and an actions slot for buttons or other controls.
 */

/** Props accepted by the {@link PageHeader} component. */
interface PageHeaderProps {
  /** Primary heading for the page. */
  title: string
  /** Optional subtitle rendered beneath the title in muted text. */
  description?: string
  /**
   * Optional slot for action controls (e.g. buttons, selects) aligned to
   * the right side of the header on wider viewports.
   */
  children?: React.ReactNode
}

/**
 * Page-level header block with a bottom border that visually separates the
 * header from the page body.
 *
 * @param props - {@link PageHeaderProps}
 */
export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-100">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  )
}
