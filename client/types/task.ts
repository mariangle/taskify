import { 
    UserResponse, 
    RecurringTask, 
    NoteResponse,
    SubtaskResponse, 
    TaskPriority, 
    TaskStatus 
} from "."

export type TaskEntry = {
    id?: string,
    name: string,
    location?: string,
    listId?: string,
    dueDate: string,
    duration?: string,
    priority?: string,
    status?: string,
    // recurring?: RecurringTask,
}

export type TaskResponse = {
    id: string,
    name: string,
    location?: string,
    listId?: string,
    dueDate: string,
    priority?: TaskPriority,
    status: TaskStatus,
    user: UserResponse,
    subtasks?: SubtaskResponse[],
    // recurring?: RecurringTask,
    // notes?: NoteResponse[]
}