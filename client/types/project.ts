import { TaskResponse } from "."

export type ProjectEntry = {
    name: string,
}

export type ProjectResponse = {
    id: string,
    userId: string,
    name: string,
    tasks: TaskResponse[]
}