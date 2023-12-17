'use client'

import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { dashboardLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { useGlobalStore } from '@/hooks/use-global-store'
import { ListResponse } from '@/types'
import { Icons } from '@/components/icons'
import { defaultEmoji } from '@/lib/constants'

import SettingsModal from '@/components/modals/settings-modal'
import ListModal from '@/components/modals/list-modal'

interface SidebarProps {
  lists: ListResponse[]
}

const Sidebar = ({ lists }: SidebarProps) => {
  const pathname = usePathname()
  const params = useParams()
  const { showSidebar } = useGlobalStore()

  return (
    <aside
      className={cn(
        'transition-all w-48 duration-300 h-full border-r flex flex-col justify-between',
        showSidebar ? '-ml-96' : '-ml-0',
      )}
    >
      <div>
        <div className="h-14 px-6 font-extrabold text-center">
          <Link href="/" aria-current="page" className="font-bold text-inherit flex-gap h-full">
            <Icons.logo className="w-4 h-4 text-primary" />
            taskify
          </Link>
        </div>
        <ul>
          {dashboardLinks.map((link) => (
            <li key={link.label} className="mb-1">
              <Link
                href={link.href}
                className={cn(
                  pathname.includes(link.href)
                    ? 'font-semibold bg-gradient-to-l from-primary/25 border-r-2 border-primary'
                    : 'font-medium',
                  'w-full block px-6 py-2',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <div>
            <div className="flex-between py-2 font-extrabold px-6">
              <h4>My Lists</h4>
              <ListModal list={null} />
            </div>
            <ul className="font-medium">
              <li>
                <Link
                  href={`/lists/braindump`}
                  className={cn(
                    'flex-between py-2 block px-6',
                    pathname === `/lists/braindump` ? 'bg-gradient-to-l from-primary/20 border-r-2 border-primary' : '',
                  )}
                >
                  🧠 Braindump
                </Link>
              </li>
              {lists?.map((list) => (
                <li key={list.id}>
                  <Link
                    className={cn(
                      'flex-between py-2 block px-6',
                      `/lists/${params.listId}` === `/lists/${list.id}`
                        ? 'bg-gradient-to-l from-primary/20 border-r-2 border-primary'
                        : '',
                    )}
                    href={`/lists/${list.id}`}
                  >
                    <div className="truncate ...">
                      {list.emoji ? list.emoji : defaultEmoji} {list.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-6 text-xs font-medium space-y-2">
        <SettingsModal>
          <div className="flex-gap">
            <Icons.settings className="mr-2 h-4 w-4" />
            Settings
          </div>
        </SettingsModal>

        <div className="flex-gap">
          <Icons.logOut className="mr-2 h-4 w-4" />
          Sign Out
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
