/**
 * @fileoverview Small pill-shaped label component used to convey categorical
 * or status information at a glance.
 */
import { cn } from '../../utils/cn'

/** Visual style variants available for a {@link Badge}. */
type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info'

/** Props accepted by the {@link Badge} component. */
interface BadgeProps {
  /** Content rendered inside the pill. */
  children: React.ReactNode
  /**
   * Controls the color scheme of the badge.
   * @defaultValue 'default'
   */
  variant?: BadgeVariant
  /** Additional Tailwind classes forwarded to the root element. */
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700 text-slate-200',
  success: 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50',
  warning: 'bg-amber-900/60 text-amber-300 border border-amber-700/50',
  danger:  'bg-red-900/60 text-red-300 border border-red-700/50',
  info:    'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50',
}

/**
 * Renders a compact, pill-shaped label.
 *
 * @param props - {@link BadgeProps}
 */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
