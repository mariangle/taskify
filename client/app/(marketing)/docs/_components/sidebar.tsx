import SidebarLink from './sidebar-link'

const docsSidebar = [
  {
    heading: 'Overview',
    links: [
      { text: 'Introduction', href: '/docs/introduction' },
      { text: 'Features', href: '/docs/features' },
    ],
  },
  {
    heading: 'Documentation',
    links: [
      { text: 'Getting Started', href: '/docs/getting-started' },
      { text: 'Authentication', href: '/docs/authentication' },
      { text: 'Usage', href: '/docs/usage' },
    ],
  },
  {
    heading: 'FAQ',
    links: [
      { text: 'Common Questions', href: '/docs/common-questions' },
      { text: 'Support', href: '/docs/support' },
    ],
  },
  {
    heading: 'Community',
    links: [{ text: 'Contributing', href: '/docs/contributing' }],
  },
]

export default function Sidebar() {
  return (
    <aside className="md:top-20 md:sticky md:self-start p-2 md:w-64 md:max-h-screen overflow-y-auto">
      {docsSidebar.map((section, index) => (
        <ul key={index} className="mb-4 text-sm">
          <li>
            <h2 className="font-semibold mb-2">{section.heading}</h2>
            <ul className="">
              {section.links.map((link, index) => (
                <SidebarLink link={link} key={index} />
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </aside>
  )
}
