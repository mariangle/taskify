import { ArrowDown, ArrowLeft, ArrowUp } from 'lucide-react'
export type Mode = {
  label: string
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
]

export const statuses = [
  {
    id: 1,
    value: 'Incomplete',
    label: 'Incomplete',
  },
  {
    id: 2,
    value: 'Completed',
    label: 'Complete',
  },
]

export const priorities = [
  { id: 1, value: 'Low', label: 'Low', icon: ArrowDown },
  { id: 2, value: 'Medium', label: 'Medium', icon: ArrowLeft },
  { id: 3, value: 'High', label: 'High', icon: ArrowUp },
]
