// ? enums from the server sat as types

export type TaskCategory = 
  | 'Work'
  | 'Personal'
  | 'Education'
  | 'Wellness'
  | 'Chore'
  | 'Social'
  | 'Travel'
  | 'Finance'
  | 'Urgent'
  | 'Shopping'

export type TaskStatus = 'Todo' | 'InProgress' | 'Completed'
export type TaskPriority = 'Low' | 'Medium' | 'High'