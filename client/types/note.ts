export type NoteEntry = {
    content: string,
    createdAt: string,
}

export type NoteResponse = {
    id: string,
    taskId: string,
    userId: string,
    content: string,
    createdAt: string,
}