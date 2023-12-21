'use client'
import { ListResponse } from '@/types'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/util/cn'
import ListModal from '@/components/modals/list-modal'
import { useParams, usePathname } from 'next/navigation'

interface SidebarProps {
  lists: ListResponse[]
}

export default function Sidebar({ lists }: SidebarProps) {
  const params = useParams()
  const path = usePathname()

  if (!path.includes('lists')) return null!

  return (
    <>
      <aside className="border-r sticky top-0 w-40 h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 text-sm text-muted-foreground">
        <div className="py-2 pl-6 px-4 flex-between h-14">
          <span className="uppercase text-xs">Lists</span>
          <ListModal />
        </div>
        <ul className="p-2 space-y-1">
          {lists.map((list) => (
            <li key={list.id} className="list-none">
              <Link
                href={`/lists/${list.id}`}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-start',
                  params.listId === list.id && 'text-foreground bg-primary/20',
                )}
              >
                {list.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  )
}
