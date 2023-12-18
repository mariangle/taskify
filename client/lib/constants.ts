import { HiArrowSmDown, HiArrowSmUp, HiArrowSmRight } from 'react-icons/hi'

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
  { id: 1, value: 'Low', label: 'Low', icon: HiArrowSmDown },
  { id: 2, value: 'Medium', label: 'Medium', icon: HiArrowSmRight },
  { id: 3, value: 'High', label: 'High', icon: HiArrowSmUp },
]
