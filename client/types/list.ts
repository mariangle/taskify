import type { TaskResponse } from '.'

export type ListEntry = {
  id?: string
  name: string
}

export type ListResponse = {
  id: string
  userId: string
  name: string
  tasks: TaskResponse[]
}
