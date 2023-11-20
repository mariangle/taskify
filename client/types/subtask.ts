export type SubtaskEntry = {
    name: string,
    description: string,
}

export type SubtaskResponse = {
    id: string,
    name: string,
    userId: string,
    isCompleted: boolean,
}
