/**
 * @fileoverview Section-level loading state that centers a spinner and an
 * optional message. Use this component while async data is in-flight.
 */
import { useTranslation } from 'react-i18next'
import { Spinner } from './ui/Spinner'

/** Props accepted by the {@link LoadingSpinner} component. */
interface LoadingSpinnerProps {
  /**
   * Descriptive label shown beneath the spinner.
   * Defaults to the translated 'loading' key when omitted.
   */
  message?: string
}

/**
 * Vertically and horizontally centered spinner with an optional status message.
 * Suitable for both full-page and section-scoped loading states.
 *
 * @param props - {@link LoadingSpinnerProps}
 */
export function LoadingSpinner({ message }: LoadingSpinnerProps) {
  const { t } = useTranslation('common')
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <Spinner size={36} className="text-indigo-400" />
      <p className="text-sm text-slate-400">{message ?? t('loading')}</p>
    </div>
  )
}
