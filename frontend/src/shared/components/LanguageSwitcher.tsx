/**
 * @fileoverview Language switcher component. Renders a pair of pill buttons (EN | ES)
 * that toggle the active i18next language. Persists the selected language to localStorage
 * under the key 'lang' and restores it on mount.
 */
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

/** Storage key used to persist the user's language preference. */
const STORAGE_KEY = 'lang'

/**
 * Self-contained EN / ES toggle. The active language button is highlighted
 * with an indigo background; the inactive button renders as a ghost outline.
 *
 * No props are required — the component reads and writes language state
 * through the shared i18n instance.
 */
export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  /** On mount, restore any previously saved preference from localStorage. */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && saved !== i18n.language) {
      void i18n.changeLanguage(saved)
    }
    // Run only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * Switch to the given language code and persist the choice.
   *
   * @param lang - BCP-47 language tag ('en' or 'es')
   */
  function handleChange(lang: string) {
    void i18n.changeLanguage(lang)
    localStorage.setItem(STORAGE_KEY, lang)
  }

  const current = i18n.language

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-slate-700 p-0.5 bg-slate-800">
      {(['en', 'es'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleChange(lang)}
          aria-pressed={current === lang}
          className={[
            'px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
            current === lang
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200',
          ].join(' ')}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}
