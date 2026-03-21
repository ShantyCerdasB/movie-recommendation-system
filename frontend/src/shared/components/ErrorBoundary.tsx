/**
 * @fileoverview React class-based error boundary that catches unhandled
 * rendering errors from any descendant component tree and renders a fallback UI.
 */
import { Component, type ErrorInfo, type ReactNode } from 'react'

/** Props accepted by the {@link ErrorBoundary} component. */
interface ErrorBoundaryProps {
  /** The component subtree to protect. */
  children: ReactNode
  /**
   * Optional custom fallback element rendered in place of the crashed subtree.
   * When omitted, a default error card is displayed.
   */
  fallback?: ReactNode
}

/** Internal state maintained by {@link ErrorBoundary}. */
interface ErrorBoundaryState {
  /** Whether a rendering error has been caught. */
  hasError: boolean
  /** The caught error instance, if any. */
  error: Error | null
}

/**
 * Wraps a subtree and intercepts any unhandled rendering error.
 * On error, it replaces the subtree with either a provided `fallback`
 * element or a built-in error card. The error is also logged to the console.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Caught rendering error:', error, info)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="bg-red-900/30 border border-red-800 rounded-xl px-8 py-10 max-w-md">
            <h2 className="text-lg font-semibold text-red-300 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              An unexpected error occurred while rendering this section.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-slate-900 border border-slate-800 rounded-lg p-4 text-red-400 overflow-auto">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-6 px-4 py-2 text-sm bg-red-700 hover:bg-red-600 text-white rounded-lg transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
