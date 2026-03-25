import { useTranslation } from 'react-i18next'
import { useNetworkActivityCount } from '../../app/store/networkActivity'
import { Spinner } from './ui/Spinner'

export function GlobalApiLoader() {
  const { t } = useTranslation('common')
  const activeRequestCount = useNetworkActivityCount()

  if (activeRequestCount === 0) {
    return null
  }

  return (
    <div className="pointer-events-none fixed top-20 right-4 z-50">
      <div className="flex items-center gap-3 rounded-full border border-indigo-500/40 bg-slate-900/90 px-4 py-2 shadow-lg shadow-slate-950/40 backdrop-blur">
        <Spinner size={18} className="text-indigo-400" />
        <span className="text-sm font-medium text-slate-200">
          {t('loading')}
        </span>
      </div>
    </div>
  )
}
