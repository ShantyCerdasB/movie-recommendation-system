/**
 * @fileoverview Top application navigation bar. Displays the brand logo on the
 * left, primary navigation links in the centre, and the language switcher on the
 * right for wider viewports.
 * On small screens the sidebar handles navigation; the navbar shows only the brand.
 */
import { NavLink } from 'react-router-dom'
import { Film } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../shared/components/LanguageSwitcher'

/** Shape of a single top-nav link entry (route path + i18n key). */
interface NavEntry {
  to: string
  /** Key in the "common" namespace used to look up the translated label. */
  labelKey: string
}

/** Static route definitions — labels are resolved at render time via i18n. */
const navLinks: NavEntry[] = [
  { to: '/movies',          labelKey: 'nav_movies' },
  { to: '/users',           labelKey: 'nav_users' },
  { to: '/recommendations', labelKey: 'nav_recommendations' },
  { to: '/matrix',          labelKey: 'nav_matrix' },
  { to: '/math',            labelKey: 'nav_math' },
]

/**
 * Fixed-height top bar with brand identity, horizontal navigation tabs,
 * and a language switcher. Active links receive an indigo bottom border
 * and lighter text color.
 */
export default function Navbar() {
  const { t } = useTranslation('common')

  return (
    <header className="sticky top-0 z-30 h-14 flex items-center bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8">
      {/* Brand */}
      <NavLink
        to="/movies"
        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mr-8"
      >
        <Film size={20} strokeWidth={2} />
        <span className="text-lg font-semibold tracking-tight text-slate-100">
          Movie<span className="text-indigo-400">Rec</span>
        </span>
      </NavLink>

      {/* Horizontal nav — hidden on small screens (sidebar takes over) */}
      <nav className="hidden md:flex items-center gap-1">
        {navLinks.map(({ to, labelKey }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-600/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800',
              ].join(' ')
            }
          >
            {t(labelKey)}
          </NavLink>
        ))}
      </nav>

      {/* Language switcher — always visible on the right */}
      <div className="ml-auto hidden md:block">
        <LanguageSwitcher />
      </div>
    </header>
  )
}
