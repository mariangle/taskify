import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

import ListModal from '@/components/modals/list-modal'

import { buttonVariants } from '@/components/ui/button'
import type { ListResponse } from '@/types'
import { cn } from '@/lib/util/cn'
import { usePathname, useRouter } from 'next/navigation'

export default function ListItem({ list }: { list?: ListResponse }) {
  if (!list) {
    return (
      <ListModal>
        <Button size={'icon'} variant={'ghost'} className="rounded-full">
          <Icons.add className="w-3 h-3" />
        </Button>
      </ListModal>
    )
  }

  const router = useRouter()
  const path = usePathname()

  return (
    <Button
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'ml-auto flex justify-start px-2 w-full text-muted-foreground dark:text-muted-foreground dark:hover:bg-accent bg-transparent dark:bg-transparent group',
        path === `/lists/${list.id}` && 'bg-primary/20 dark:bg-primary/20',
      )}
      onClick={() => {
        router.push(`/lists/${list.id}`)
      }}
    >
      <div className="rounded-full bg-primary/10 p-1">
        <span className="h-4 w-4 block text-center text-xs text-foreground">{list.name[0]}</span>
      </div>
      <span className={cn('ml-2')}>{list.name}</span>
      <div
        className="group-hover:block hidden ml-auto"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ListModal list={list}>
          <Button size={'icon'} variant={'ghost'} className="rounded-full">
            <Icons.more className="w-3 h-3" />
          </Button>
        </ListModal>
      </div>
    </Button>
  )
}
