type Category = 
  | 'Work'
  | 'Personal'
  | 'Education'
  | 'Health and Fitness'
  | 'Errands'
  | 'Social'
  | 'Hobbies'
  | 'Travel'
  | 'Finance'
  | 'Urgent'
  | 'Daily Routine'
  | 'Shopping'

type RecurringTask = {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval?: number; 
};

type TaskStatus = 'Todo' | 'in-progress' | 'completed'

enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

type UserEntry = {
    username: string,
    password: string,
    name: string,
}

type UserResponse = {
    id: string,
    image: string,
    username: string,
    password: string
    name: string,
    tasks: TaskResponse[],
}

type TaskEntry = {
    title: string,
    description?: string,
    location?: string,
    dueDate: string,
    category?: string,
    priority?: string,
    status?: string,
    recurring?: RecurringTask,
}

type TaskResponse = {
    id: string,
    title: string,
    description?: string,
    tags: string[],
    location: string,
    dueDate: string,
    category: Category,
    priority: TaskPriority,
    status: TaskStatus,
    user: UserResponse,
    subtasks: SubtaskResponse[],
    recurring: RecurringTask,
}

type SubtaskEntry = {
    title: string,
    description: string,
}

type SubtaskResponse = {
    title: string,
    description: string,
    completed: boolean,
}

export {
  TaskPriority,
}

export type {
    TaskStatus,
    RecurringTask,
    UserEntry,
    UserResponse,
    TaskEntry,
    TaskResponse,
    SubtaskEntry,
    SubtaskResponse
}