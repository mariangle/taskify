import { 
    UserResponse, 
    RecurringTask, 
    NoteResponse,
    SubtaskResponse, 
    TaskPriority, 
    TaskStatus, 
    LabelResponse
} from "."

export type TaskEntry = {
    id?: string,
    name: string,
    listId?: string | null,
    dueDate?: string | null | Date,
    duration?: string,
    priority?: string | null,
    status?: string,
    labelIds?: string[] | null
    // recurring?: RecurringTask,
}

export type TaskResponse = {
    id: string,
    name: string,
    listId?: string | null,
    dueDate?: string | null,
    priority?: TaskPriority | null,
    status: TaskStatus,
    user: UserResponse,
    subtasks?: SubtaskResponse[] | [],
    labels?: LabelResponse[] | []
    // recurring?: RecurringTask,
    // notes?: NoteResponse[]
}