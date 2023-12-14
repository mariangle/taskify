import { 
  HiArrowSmDown, 
  HiArrowSmUp, 
  HiArrowSmRight,
} from "react-icons/hi";

export const dashboardLinks = [
  { label: 'Dashboard', href: '/dashboard'},
  { label: 'Tasks', href: '/tasks'},
  { label: 'Projects', href: '/projects'},

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

export const statuses = [
  {
    id: 1, value: 'Incomplete', label: 'Incomplete',
  }, 
  {
    id: 2, value: 'InProgress', label: 'In Progress',
  }, 
  {
    id: 3, value: 'Completed', label: 'Complete',
  }
]

export const priorities = [
  { id: 1, value: 'Low', label: 'Low', icon: HiArrowSmDown}, 
  { id: 2, value: 'Medium', label: 'Medium', icon: HiArrowSmRight}, 
  { id: 3, value: 'High', label: 'High', icon: HiArrowSmUp}, 
]

export const danishPhoneNumberRegex = /\+45\s\d{8}/g;
export const defaultEmoji =  "🌟";

