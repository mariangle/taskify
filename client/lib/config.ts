import { Inbox, GanttChartSquare, CalendarClock, CalendarDays } from 'lucide-react'

export const config = {
  metadata: {
    title: {
      default: '.taskify',
      template: `%s | Taskify`,
    },
    description: 'Collaborate, manage projects, and reach new productivity peaks',
    icons: [
      {
        url: '/vercel.svg',
        href: '/vercel.svg',
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
        label: 'Inbox',
        icon: Inbox,
        href: '/inbox',
      },
      {
        label: 'Today',
        icon: CalendarDays,
        href: '/today',
      },
      {
        label: 'Upcoming',
        icon: CalendarClock,
        href: '/upcoming',
      },
      {
        label: 'Lists',
        icon: GanttChartSquare,
        href: '/lists',
      },
    ],
  },
}
