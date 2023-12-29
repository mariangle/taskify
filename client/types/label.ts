import type { TaskResponse } from '.'

export type LabelEntry = {
  id?: string
  name: string
  color?: string
}

export type LabelResponse = {
  id: string
  color: string
  userId: string
  name: string
  tasks: TaskResponse[]
}
