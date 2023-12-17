import { UserResponse, RecurringTask, SubtaskResponse, TaskPriority, TaskStatus, LabelResponse } from '.'

export type TaskEntry = {
  id?: string
  name: string
  listId?: string | null
  dueDate?: string | null | Date
  duration?: string
  priority?: string | null
  status?: string
  labelIds?: string[] | null
  note?: string
  // recurring?: RecurringTask,
}

export type TaskResponse = {
  id: string
  name: string
  listId?: string | null
  dueDate?: string
  priority?: TaskPriority | null
  createdAt?: string
  updatedAt?: string
  note?: string
  status: TaskStatus
  user: UserResponse
  subtasks?: SubtaskResponse[] | []
  labels?: LabelResponse[] | []
  // recurring?: RecurringTask,
}
