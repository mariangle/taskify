export const config = {
  metadata: {
    title: {
      default: '.taskify',
      template: `%s | Taskify`,
    },
    description: "Collaborate, manage projects, and reach new productivity peaks",
    icons: [
      {
        url: "/logo.svg",
        href: "/logo.svg"
      }
    ]
  },
  settings: [
    {
      title: "Account",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
  ],
}