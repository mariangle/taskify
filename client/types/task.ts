import { 
    UserResponse, 
    RecurringTask, 
    NoteResponse,
    SubtaskResponse, 
    TaskCategory, 
    TaskPriority, 
    TaskStatus 
} from "."

export type TaskEntry = {
    title: string,
    description?: string,
    location?: string,
    dueDate: string,
    category?: string,
    attachments?: string[],
    priority?: string,
    status?: string,
    recurring?: RecurringTask,
    tags?: string[], 
}

export type TaskResponse = {
    id: string,
    title: string,
    description?: string,
    tags?: string[],
    attachments?: string[],
    location?: string,
    dueDate: string,
    category?: TaskCategory,
    priority?: TaskPriority,
    status: TaskStatus,
    user: UserResponse,
    subtasks?: SubtaskResponse[],
    recurring?: RecurringTask,
    notes?: NoteResponse[]
}