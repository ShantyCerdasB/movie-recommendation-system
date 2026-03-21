/**
 * @fileoverview Styled button primitive with support for multiple visual
 * variants and sizes.
 */
import { cn } from '../../utils/cn'

/** Visual style variants for the {@link Button} component. */
type ButtonVariant = 'primary' | 'secondary' | 'ghost'

/** Size scale options for the {@link Button} component. */
type ButtonSize = 'sm' | 'md' | 'lg'

/** Props accepted by the {@link Button} component. */
interface ButtonProps {
  /** Label or content rendered inside the button. */
  children: React.ReactNode
  /** Click handler attached to the button element. */
  onClick?: () => void
  /**
   * When `true`, the button is non-interactive and visually dimmed.
   * @defaultValue false
   */
  disabled?: boolean
  /**
   * Controls the color scheme of the button.
   * @defaultValue 'primary'
   */
  variant?: ButtonVariant
  /**
   * Controls the padding and text size of the button.
   * @defaultValue 'md'
   */
  size?: ButtonSize
  /** Additional Tailwind classes forwarded to the root element. */
  className?: string
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500',
  secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 focus-visible:ring-slate-500',
  ghost:     'bg-transparent text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus-visible:ring-slate-500',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
}

/**
 * Accessible, keyboard-focusable button with consistent dark-theme styling.
 *
 * @param props - {@link ButtonProps}
 */
export function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        'disabled:opacity-40 disabled:pointer-events-none',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </button>
  )
}
