/**
 * @fileoverview Tab control for switching between matrix views.
 */
import { useTranslation } from 'react-i18next'
import { cn } from '../../shared/utils/cn'

/** The two available matrix views. */
export type MatrixTab = 'ratings' | 'similarity'

/** Props accepted by the {@link MatrixControls} component. */
interface MatrixControlsProps {
  /** The currently active tab. */
  activeTab: MatrixTab
  /** Callback invoked when the user selects a different tab. */
  onTabChange: (tab: MatrixTab) => void
}

/** Maps each {@link MatrixTab} to its translation key in the "pages" namespace. */
const TAB_KEYS: Record<MatrixTab, string> = {
  ratings: 'ratings_matrix_tab',
  similarity: 'similarity_matrix_tab',
}

/**
 * Renders two tab buttons that toggle between the ratings matrix view
 * and the cosine similarity matrix view. Labels are resolved via i18n so
 * they update automatically when the active language changes.
 *
 * @param props - {@link MatrixControlsProps}
 */
export function MatrixControls({ activeTab, onTabChange }: MatrixControlsProps) {
  const { t } = useTranslation('pages')

  return (
    <div className="flex gap-1 p-1 bg-slate-800 rounded-lg w-fit mb-6">
      {(Object.keys(TAB_KEYS) as MatrixTab[]).map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
            activeTab === tab
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700',
          )}
        >
          {t(TAB_KEYS[tab])}
        </button>
      ))}
    </div>
  )
}
