import { Inbox, CalendarClock, CalendarDays, Tag } from 'lucide-react'

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
  marketing: {
    links: [
      {
        title: 'Features',
        href: '/docs/features',
      },
      {
        title: 'Pricing',
        href: '/docs/primitives/hover-card',
      },
      {
        title: 'Docs',
        href: '/docs/getting-started',
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
        label: 'Labels',
        icon: Tag,
        href: '/labels',
      },
    ],
  },
}
