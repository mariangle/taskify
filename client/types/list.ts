import type { TaskResponse } from '.'

export type ListEntry = {
  id?: string
  name: string
  emoji?: string
}

export type ListResponse = {
  id: string
  userId: string
  name: string
  emoji?: string
  tasks: TaskResponse[]
}
