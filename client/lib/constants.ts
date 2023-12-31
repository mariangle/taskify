import {
  Calendar,
  CalendarClock,
  CalendarDays,
  Clipboard,
  Inbox,
  Menu,
  Tags,
  Timer,
} from 'lucide-react';

export type Mode = {
  label: string;
  value: string;
};

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
    id: 1,
    value: 'Incomplete',
    label: 'Incomplete',
  },
  {
    id: 2,
    value: 'Completed',
    label: 'Complete',
  },
];

export const sidebarItems = [
  {
    id: 'inbox',
    label: 'Inbox',
    icon: Inbox,
  },
  {
    id: 'today',
    label: 'Today',
    icon: CalendarDays,
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    icon: CalendarClock,
  },
  {
    id: 'labels',
    label: 'Labels',
    icon: Tags,
  },
  {
    id: 'lists',
    label: 'Lists',
    icon: Menu,
  },
] as const;

export type SidebarItem = (typeof sidebarItems)[number]['id'];

export const widgetItems = [
  {
    id: 'calendar',
    label: 'Calendar',
    icon: Calendar,
  },
  {
    id: 'timer',
    label: 'Timer',
    icon: Timer,
  },
  {
    id: 'notes',
    label: 'Notes',
    icon: Clipboard,
  },
] as const;

export type WidgetItem = (typeof widgetItems)[number]['id'];
