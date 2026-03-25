/**
 * @fileoverview Card presenting a user's identity and their overall
 * contribution to the ratings dataset.
 */
import { User } from 'lucide-react'
import { Badge } from '../../shared/components/ui/Badge'
import type { UserDto } from '../../types'

/** Props accepted by the {@link UserProfileCard} component. */
interface UserProfileCardProps {
  /** The user whose information is displayed. */
  user: UserDto
  /** Total number of ratings the user has submitted. */
  ratingsCount: number
  /** Whether this card is currently selected/active. */
  isSelected?: boolean
  /** Click handler for selecting this user. */
  onClick?: () => void
}

/**
 * Displays a user's avatar placeholder, display name, and rating count
 * inside a bordered card. Supports an active/selected highlight state.
 *
 * @param props - {@link UserProfileCardProps}
 */
export function UserProfileCard({
  user,
  ratingsCount,
  isSelected = false,
  onClick,
}: UserProfileCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full text-left transition-all',
        'bg-slate-900 border rounded-xl shadow-md px-5 py-4',
        'hover:border-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
        isSelected
          ? 'border-indigo-600 ring-1 ring-indigo-600'
          : 'border-slate-800',
      ].join(' ')}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-900/50 border border-indigo-700/50 shrink-0">
          <User size={18} className="text-indigo-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-100 truncate">{user.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">ID: {user.id}</p>
        </div>
        <Badge variant="info">
          {ratingsCount} {ratingsCount === 1 ? 'rating' : 'ratings'}
        </Badge>
      </div>
    </button>
  )
}
