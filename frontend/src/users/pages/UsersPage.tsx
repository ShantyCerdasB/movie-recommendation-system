/**
 * @fileoverview Users feature page. Lists all registered users and displays
 * the selected user's rating history alongside the movie catalog.
 */
import { useState } from 'react'
import { Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../../shared/components/PageHeader'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { EmptyState } from '../../shared/components/EmptyState'
import { ErrorBoundary } from '../../shared/components/ErrorBoundary'
import { useUsers } from '../hooks/useUsers'
import { useUserRatings } from '../hooks/useUserRatings'
import { UserProfileCard } from '../components/UserProfileCard'
import { UserRatingsList } from '../components/UserRatingsList'
import { useMovies } from '../../movies/hooks/useMovies'

/**
 * Full-page view for the users section.
 * Renders a grid of user profile cards; selecting a card reveals that user's
 * rating history in a detail panel below.
 */
export default function UsersPage() {
  const { t } = useTranslation('pages')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const { data: users, isLoading: usersLoading, isError: usersError } = useUsers()
  const { data: ratings, isLoading: ratingsLoading } = useUserRatings(selectedUserId)
  const { data: movies = [] } = useMovies()

  const handleSelectUser = (userId: string) => {
    setSelectedUserId((prev) => (prev === userId ? null : userId))
  }

  return (
    <ErrorBoundary>
      <PageHeader
        title={t('users_title')}
        description={t('users_desc')}
      />

      {usersLoading && <LoadingSpinner message="Loading users…" />}

      {usersError && (
        <div className="rounded-xl border border-red-800 bg-red-900/20 px-5 py-4">
          <p className="text-sm text-red-400">
            Failed to load users. Check your connection and try again.
          </p>
        </div>
      )}

      {!usersLoading && !usersError && users && users.length === 0 && (
        <EmptyState
          title="No users found"
          description="No users have been added to the system yet."
          icon={<Users size={40} />}
        />
      )}

      {!usersLoading && !usersError && users && users.length > 0 && (
        <div className="flex flex-col gap-8">
          {/* User grid */}
          <section>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
              All users — {users.length} total
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {users.map((user) => (
                <UserProfileCard
                  key={user.id}
                  user={user}
                  ratingsCount={
                    selectedUserId === String(user.id) && ratings
                      ? ratings.length
                      : 0
                  }
                  isSelected={selectedUserId === String(user.id)}
                  onClick={() => handleSelectUser(String(user.id))}
                />
              ))}
            </div>
          </section>

          {/* Ratings detail panel */}
          {selectedUserId && (
            <section>
              {ratingsLoading ? (
                <LoadingSpinner message="Loading ratings…" />
              ) : ratings ? (
                <UserRatingsList ratings={ratings} movies={movies} />
              ) : null}
            </section>
          )}
        </div>
      )}
    </ErrorBoundary>
  )
}
