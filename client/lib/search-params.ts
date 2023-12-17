export interface SearchParamsOptions {
  listId?: string
  labelId?: string
  projectId?: string
  unsorted?: boolean
  upcoming?: boolean
  overdue?: boolean
  incomplete?: boolean
  completed?: boolean
}

export const queryParamsMapping: Record<keyof SearchParamsOptions, keyof SearchParamsOptions> = {
  listId: 'listId',
  labelId: 'labelId',
  projectId: 'projectId',
  unsorted: 'unsorted',
  upcoming: 'upcoming',
  overdue: 'overdue',
  incomplete: 'incomplete',
  completed: 'completed',
}
