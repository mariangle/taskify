import { cn } from '@/lib/util/cn'

export const BoardContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'list-none bg-background border rounded-md shadow-md dark:shadow-black dark:bg-neutral-900 dark:border-neutral-800',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b py-2 group">{children}</div>
}
