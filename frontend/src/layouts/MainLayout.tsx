/**
 * @fileoverview Main application shell. Composes the persistent top navbar
 * and left sidebar with a scrollable content area rendered via React Router's
 * {@link Outlet}.
 */
import { Outlet, NavLink } from 'react-router-dom'
import { Film, Users, Star, Grid, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'

/** A single sidebar navigation entry. */
interface SidebarLink {
  to: string
  labelKey: string
  icon: React.ReactNode
}

const sidebarLinks: SidebarLink[] = [
  { to: '/movies',          labelKey: 'nav_movies',          icon: <Film size={18} /> },
  { to: '/users',           labelKey: 'nav_users',           icon: <Users size={18} /> },
  { to: '/recommendations', labelKey: 'nav_recommendations', icon: <Star size={18} /> },
  { to: '/matrix',          labelKey: 'nav_matrix',          icon: <Grid size={18} /> },
  { to: '/math',            labelKey: 'nav_math',            icon: <BookOpen size={18} /> },
]

/**
 * Shell layout used by every page in the application.
 * Renders a fixed {@link Navbar} at the top, a collapsible sidebar on the
 * left, and the matched child route inside the main content area.
 */
export default function MainLayout() {
  const { t } = useTranslation('common')

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-56 shrink-0 bg-slate-900 border-r border-slate-800">
          <nav className="flex flex-col gap-1 p-3 pt-6">
            {sidebarLinks.map(({ to, labelKey, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800',
                  ].join(' ')
                }
              >
                {icon}
                {t(labelKey)}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-slate-800">
            <p className="text-xs text-slate-500 leading-relaxed">
              {t('sidebar_footer')}
            </p>
          </div>
        </aside>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
