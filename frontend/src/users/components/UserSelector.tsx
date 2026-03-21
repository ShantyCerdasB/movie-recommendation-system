/**
 * @fileoverview Dropdown control for selecting the active user.
 */
import { useTranslation } from 'react-i18next'
import { Select } from '../../shared/components/ui/Select'
import { LoadingSpinner } from '../../shared/components/LoadingSpinner'
import { useUsers } from '../hooks/useUsers'

/** Props accepted by the {@link UserSelector} component. */
interface UserSelectorProps {
  /** The ID of the currently selected user, or `null` if none is chosen. */
  selectedUserId: string | null
  /** Callback invoked with the newly selected user's ID string. */
  onSelect: (userId: string) => void
}

/**
 * Wraps the shared {@link Select} primitive with user-list data fetching.
 * Displays a loading indicator while the user list is being retrieved and
 * an inline error message if the request fails.
 *
 * @param props - {@link UserSelectorProps}
 */
export function UserSelector({ selectedUserId, onSelect }: UserSelectorProps) {
  const { t } = useTranslation('common')
  const { data: users, isLoading, isError } = useUsers()

  if (isLoading) {
    return <LoadingSpinner message={t('loading_users')} />
  }

  if (isError || !users) {
    return (
      <p className="text-sm text-red-400">{t('error_load_users')}</p>
    )
  }

  const options = users.map((u) => ({
    value: String(u.id),
    label: u.name,
  }))

  return (
    <Select
      label={t('select_user_label')}
      options={options}
      value={selectedUserId ?? ''}
      onChange={onSelect}
      placeholder={t('select_user_placeholder')}
    />
  )
}
