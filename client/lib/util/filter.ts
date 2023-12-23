export interface SearchParamsOptions {
  listId?: string
  labelId?: string
  unsorted?: boolean
  upcoming?: boolean
  overdue?: boolean
  incomplete?: boolean
  pending?: boolean
  completed?: boolean
  view?: string
  dueDate?: string
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
  view: 'view',
  dueDate: 'dueDate',
}

export interface ExtendedSearchParamsOptions extends SearchParamsOptions {
  view?: 'board' | 'table' | 'list'
  clear: string
  status: 'incomplete' | 'pending' | 'completed'
}

export type FilterOption = keyof ExtendedSearchParamsOptions
