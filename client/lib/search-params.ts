export interface SearchParamsOptions {
  listId?: string
  labelId?: string
  unsorted?: boolean
  upcoming?: boolean
  overdue?: boolean
  incomplete?: boolean
  pending?: boolean
  completed?: boolean
}

export const queryParamsMapping: Record<keyof SearchParamsOptions, keyof SearchParamsOptions> = {
  listId: 'listId',
  labelId: 'labelId',
  unsorted: 'unsorted',
  upcoming: 'upcoming',
  overdue: 'overdue',
  pending: 'pending',
  incomplete: 'incomplete',
  completed: 'completed',
}
