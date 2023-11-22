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

type NextUIColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'default'

export type StatusEnum = {
  value: TaskStatus,
  label: string,
  color?: NextUIColorVariant,
}

export type PriorityEnum = {
  value: TaskPriority,
  label: string,
}


export const statuses: StatusEnum[] = [
  {
    value: 'Incomplete', label: 'Incomplete', color: 'primary',
  }, 
  {
    value: 'InProgress', label: 'In Progress', color: 'warning',
  }, 
  {
    value: 'Completed', label: 'Complete', color: 'success',
  }
]

export const priorities: PriorityEnum[] = [
  { value: 'Low', label: 'Low'}, 
  { value: 'Medium', label: 'Medium'}, 
  { value: 'High', label: 'High'}, 
]

export const danishPhoneNumberRegex = /\+45\s\d{8}/g;
export const defaultEmoji =  "📋";

