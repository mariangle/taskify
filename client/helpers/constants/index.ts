import { TaskStatus, TaskPriority } from "@/types";

export const dashboardLinks = [
  { label: 'Dashboard', href: '/dashboard'},
  { label: 'Tasks', href: '/tasks'},
]

export type Mode = {
    label: string,
    value: string
}

export const modes: Mode[] = [
  {
    label: 'Automatic',
    value: 'auto',
  },
  {
    label: 'Manual',
    value: 'manual',
  },
  {
    label: 'Hold-to-talk',
    value: 'hold',
  },
];

export type StatusEnum = {
  id: number,
  value: TaskStatus,
  label: string,
  color?: string,
}

export type PriorityEnum = {
  id: number,
  value: TaskPriority,
  label: string,
}


export const statuses: StatusEnum[] = [
  {
    id: 1, value: 'Incomplete', label: 'Incomplete', color: 'sky',
  }, 
  {
    id: 2, value: 'InProgress', label: 'In Progress', color: 'yellow',
  }, 
  {
    id: 3, value: 'Completed', label: 'Complete', color: 'emerald',
  }
]

export const priorities: PriorityEnum[] = [
  { id: 1, value: 'Low', label: 'Low'}, 
  { id: 2, value: 'Medium', label: 'Medium'}, 
  { id: 3, value: 'High', label: 'High'}, 
]

export const danishPhoneNumberRegex = /\+45\s\d{8}/g;
export const defaultEmoji =  "🌟";

