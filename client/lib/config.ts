import { LayoutGrid, ListTodo, Calendar } from 'lucide-react'

export const config = {
  metadata: {
    title: {
      default: '.taskify',
      template: `%s | Taskify`,
    },
    description: 'Collaborate, manage projects, and reach new productivity peaks',
    icons: [
      {
        url: '/logo.svg',
        href: '/logo.svg',
      },
    ],
  },
  settings: [
    {
      title: 'Account',
      items: [
        {
          title: 'Introduction',
          href: '/docs',
          items: [],
        },
        {
          title: 'Installation',
          href: '/docs/installation',
          items: [],
        },
      ],
    },
  ],
  marketing: {
    links: [
      {
        label: 'Features',
        href: '',
      },
      {
        label: 'Pricing',
        href: '',
      },
      {
        label: 'Docs',
        href: '',
      },
    ],
  },
  platform: {
    links: [
      {
        label: 'Dashboard',
        icon: LayoutGrid,
        href: '/dashboard',
      },
      {
        label: 'Tasks',
        icon: ListTodo,
        href: '/tasks',
      },
      {
        label: 'Calendar',
        icon: Calendar,
        href: '/calendar',
      },
    ],
  },
}
