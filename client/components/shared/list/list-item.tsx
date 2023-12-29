import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import ListModal from '@/components/modals/list-modal'

import { buttonVariants } from '@/components/ui/button'
import type { ListResponse } from '@/types'
import { cn } from '@/lib/util/cn'
import { usePathname, useRouter } from 'next/navigation'
import { useMounted } from '@/hooks/use-mounted'

export default function ListItem({ item }: { item: ListResponse }) {
  const router = useRouter()
  const path = usePathname()
  const isMounted = useMounted()

  if (!isMounted)
    return (
      <div className="flex-gap py-2 px-2">
        <Skeleton className="w-6 h-6" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
    )

  return (
    <Button
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'flex justify-start px-2 w-full text-muted-foreground dark:text-muted-foreground dark:hover:bg-accent bg-transparent dark:bg-transparent group',
        path === `/lists/${item.id}` && 'bg-primary/20 dark:bg-primary/20',
      )}
      onClick={() => {
        router.push(`/lists/${item.id}`)
      }}
    >
      <div className="rounded-full bg-primary/10 p-1">
        <span className="h-4 w-4 block text-center text-xs text-foreground">{item.name[0]}</span>
      </div>
      <span className={cn('ml-2')}>{item.name}</span>
      <div
        className="group-hover:block hidden ml-auto"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ListModal list={item} />
      </div>
    </Button>
  )
}
