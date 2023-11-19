import { TaskResponse } from "."

export type UserEntry = {
    username: string,
    password: string,
    name: string,
}

export type UserResponse = {
    id: string,
    image: string,
    username: string,
    password: string
    name: string,
    tasks: TaskResponse[],
}
