import { cn } from '@/lib/util/cn'

export const BoardContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('list-none border bg-background rounded-md shadow-lg', className)}>{children}</div>
}

export const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b py-2 group">{children}</div>
}
