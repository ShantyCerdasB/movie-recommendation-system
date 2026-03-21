/**
 * @fileoverview Animated SVG loading spinner primitive.
 */

/** Props accepted by the {@link Spinner} component. */
interface SpinnerProps {
  /**
   * Diameter of the spinner in pixels.
   * @defaultValue 24
   */
  size?: number
  /** Additional CSS class names forwarded to the `<svg>` element. */
  className?: string
}

/**
 * A lightweight SVG spinner that communicates an indeterminate loading state.
 * The animation is handled entirely via a CSS `spin` keyframe so it respects
 * `prefers-reduced-motion` through Tailwind's `animate-spin` utility.
 *
 * @param props - {@link SpinnerProps}
 */
export function Spinner({ size = 24, className = '' }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`animate-spin ${className}`}
      aria-label="Loading"
      role="status"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-20"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-80"
      />
    </svg>
  )
}
