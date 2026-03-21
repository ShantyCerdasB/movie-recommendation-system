/**
 * @fileoverview General-purpose content container with an optional structured
 * header area (title + description) and a main content slot.
 */
import { cn } from '../../utils/cn'

/** Props accepted by the {@link Card} component. */
interface CardProps {
  /** Main content rendered inside the card body. */
  children: React.ReactNode
  /** Optional additional Tailwind classes applied to the card wrapper. */
  className?: string
  /** Optional heading text displayed above the card body. */
  title?: string
  /** Optional subtitle or description displayed beneath the title. */
  description?: string
}

/**
 * A bordered, rounded surface for grouping related content.
 * When `title` is provided the card gains a structured header section
 * separated from the body by a divider.
 *
 * @param props - {@link CardProps}
 */
export function Card({ children, className, title, description }: CardProps) {
  return (
    <div
      className={cn(
        'bg-slate-900 border border-slate-800 rounded-xl shadow-md',
        className,
      )}
    >
      {(title ?? description) && (
        <div className="px-5 py-4 border-b border-slate-800">
          {title && (
            <h3 className="text-base font-semibold text-slate-100">{title}</h3>
          )}
          {description && (
            <p className="mt-0.5 text-sm text-slate-400">{description}</p>
          )}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}
