import { cn } from '@/lib/util/cn'

export const BoardContainer: React.FC<React.HTMLProps<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'list-none border bg-background-secondary rounded-md shadow-lg hover:border-primary/50 hover:shadow-xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const ListContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('border-b py-2 group', className)}>{children}</div>
}

export const SubtaskContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn('border-t group/subtask', className)}>{children}</div>
}
