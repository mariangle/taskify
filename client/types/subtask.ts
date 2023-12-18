export type SubtaskEntry = {
  id?: string
  name: string
}

export type SubtaskResponse = {
  id: string
  name: string
  userId: string
  isCompleted: boolean
}
