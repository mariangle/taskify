'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { dashboardLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { ListResponse, ProjectResponse } from '@/types'
import { Icons } from '@/components/icons'

import ListModal from '@/components/modals/list-modal'
import ListItem from './list-header'

interface SidebarProps {
  lists: ListResponse[]
  projects: ProjectResponse[]
}

const Sidebar = ({ lists, projects }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside className="h-full border-r flex flex-col justify-between">
      <div>
        <div className="h-14 px-6 font-extrabold text-center">
          <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap h-full">
            <Icons.logo className="w-6 h-6 text-primary" />
            Taskify
          </Link>
        </div>
        <ul>
          {dashboardLinks.map((link) => (
            <li key={link.label} className="mb-1">
              <Link
                href={link.href}
                className={cn(
                  pathname.includes(link.href)
                    ? 'font-semibold bg-gradient-to-l from-primary/20 border-r-3 border-primary'
                    : 'font-medium',
                  'w-full block px-6 py-2 text-sm',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          <div className="px-6 text-sm">
            <div className="flex-between py-3 font-extrabold">
              <h4>My Lists</h4>
              <ListModal list={null} />
            </div>
            <div className="space-y-2 my-2 font-medium text-sm">
              <ListItem />
              <Suspense fallback={'LOADING'}>
                {lists && lists.map((list) => <ListItem list={list} key={list.id} />)}
              </Suspense>
            </div>
          </div>
        </ul>
      </div>
      <div className="p-6 text-xs font-medium space-y-2">
        <div className="flex-gap">
          <Icons.settings className="mr-2 h-4 w-4" />
          Settings
        </div>
        <div className="flex-gap">
          <Icons.logOut className="mr-2 h-4 w-4" />
          Sign Out
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
