import { Inbox, CalendarClock, CalendarDays, Tag } from 'lucide-react';

export const config = {
  metadata: {
    title: {
      default: 'Taskify',
      template: `%s | Taskify`,
    },
    description:
      'Collaborate, manage projects, and reach new productivity peaks',
    icons: [
      {
        url: '/vercel.svg',
        href: '/vercel.svg',
      },
    ],
  },
  marketing: {
    links: [
      {
        title: 'Features',
        href: '/#features',
      },
      {
        title: 'Pricing',
        href: '/#pricing',
      },
      {
        title: 'Docs',
        href: '/docs/features',
      },
    ],
    docsLinks: [
      {
        heading: 'Create tasks',
        links: [
          { text: 'Creating Tasks', href: '#' },
          { text: 'Markdown Editor', href: '#' },
          { text: 'Mention to Action', href: '#' },
          { text: 'Natural Language Processing', href: '#' },
          { text: 'AI Integration', href: '#' },
          { text: 'Speech Recognition', href: '#' },
        ],
      },
      {
        heading: 'Task Properties',
        links: [
          { text: 'Labels', href: '#' },
          { text: 'Lists', href: '#' },
          { text: 'Status', href: '#' },
          { text: 'Priority', href: '#' },
          { text: 'Subtasks', href: '#' },
          { text: 'Reminders', href: '#' },
          { text: 'Attachments', href: '#' },
          { text: 'Recurring Tasks', href: '#' },
        ],
      },
      {
        heading: 'Additional Features',
        links: [
          { text: 'Time Tracking', href: '#' },
          { text: 'Publishing', href: '#' },
          { text: 'Keyboard shortcuts', href: '#' },
          { text: 'Drag and Drop', href: '#' },
        ],
      },
      {
        heading: 'Filtering and Views',
        links: [
          { text: 'Filters', href: '#' },
          { text: 'Views', href: '#' },
          { text: 'Display Options', href: '#' },
        ],
      },
    ],
  },
  platform: {
    links: [
      {
        id: 'inbox',
        label: 'Inbox',
        icon: Inbox,
        href: '/inbox',
      },
      {
        id: 'today',
        label: 'Today',
        icon: CalendarDays,
        href: '/today',
      },
      {
        id: 'upcoming',
        label: 'Upcoming',
        icon: CalendarClock,
        href: '/upcoming',
      },
      {
        id: 'labels',
        label: 'Labels',
        icon: Tag,
        href: '/labels',
      },
    ],
  },
};
