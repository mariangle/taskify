import { 
    UserResponse, 
    RecurringTask, 
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
    projectId?: string | null,
    status?: string,
    labelIds?: string[] | null,
    note?: string,
    labels?: LabelResponse[] | [],
    // recurring?: RecurringTask,
}

export type TaskResponse = {
    id: string,
    name: string,
    projectId?: string | null,
    listId?: string | null,
    dueDate?: string | null,
    priority?: TaskPriority | null,
    createdAt?: string,
    updatedAt?: string,
    note?: string,
    status: TaskStatus,
    user: UserResponse,
    subtasks?: SubtaskResponse[] | [],
    labels?: LabelResponse[] | []
    // recurring?: RecurringTask,
}