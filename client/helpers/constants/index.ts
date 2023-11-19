import { TaskStatus, TaskCategory, TaskPriority } from "@/types";

import { HiArrowSmDown, HiOutlineArrowSmRight, HiArrowSmUp, HiArrowSmRight } from "react-icons/hi";

export const dashboardLinks = [
  { label: 'Dashboard', href: '/dashboard'},
  { label: 'Tasks', href: '/tasks'},
  { label: 'Calendar', href: '/calendar'},
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

export type CategoryEnum = {
  value: TaskCategory,
  label: string,
}

export const statuses: StatusEnum[] = [
  {
    value: 'Todo', label: 'New', color: 'primary',
  }, 
  {
    value: 'InProgress', label: 'In Progress', color: 'warning',
  }, 
  {
    value: 'Completed', label: 'Done', color: 'success',
  }
]

export const categories: CategoryEnum[] = [
  { value: 'Work', label: ''}, 
  { value: 'Personal', label: ''}, 
  { value: 'Education', label: ''}, 
  { value: 'Wellness', label: ''}, 
  { value: 'Chore', label: ''}, 
  { value: 'Social', label: ''},  
  { value: 'Travel', label: ''},   
  { value: 'Finance', label: ''},  
  { value: 'Urgent', label: ''}, 
  { value: 'Shopping', label: ''}, 
]

export const priorities: PriorityEnum[] = [
  { value: 'Low', label: 'low'}, 
  { value: 'Medium', label: 'medium'}, 
  { value: 'High', label: 'high'}, 
]

export const danishPhoneNumberRegex = /\+45\s\d{8}/g;
