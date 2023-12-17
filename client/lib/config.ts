import { LayoutGrid, ListTodo } from 'lucide-react'

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
        color: 'text-sky-500',
      },
      {
        label: 'Tasks',
        icon: ListTodo,
        href: '/tasks',
        color: 'text-green-500',
      },
    ],
  },
}
