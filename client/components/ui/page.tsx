import TaskItem from '../shared/task/task-item'
import LabelItem from '../shared/label/label-item'

import { cn } from '@/lib/util/cn'

import type { LabelResponse, ListResponse, TaskResponse } from '@/types'

export const PageList = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-md mx-auto">{children}</div>
}

export const PageBoard = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">{children}</div>
}

export const PageTable = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-lg mx-auto">{children}</div>
}

export const PageHeading = ({
  children,
  items,
  color,
  level = 'h1',
  className,
}: {
  children: React.ReactNode
  items?: any[]
  color?: string
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}) => {
  const HeadingTag = level

  return (
    <div className="flex-gap">
      {color && <span className={cn('flex items-center justify-center h-2 w-2 rounded-full', color)} />}
      <HeadingTag className={cn('font-bold text-xl', className)}>{children}</HeadingTag>
      {items && <p className="text-muted-foreground text-xs">({items.length})</p>}
    </div>
  )
}

export const LabelList = ({ labels }: { labels: LabelResponse[] }) => {
  return (
    <div className="space-y-2">
      {labels.map((label) => (
        <LabelItem key={label.id} label={label} />
      ))}
      <LabelItem />
    </div>
  )
}

export const TaskList = ({
  tasks,
  lists,
  labels,
  type,
}: {
  tasks: TaskResponse[]
  lists: ListResponse[]
  labels: LabelResponse[]
  type?: 'board' | 'list'
}) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} lists={lists} labels={labels} type={type} />
      ))}
      <TaskItem labels={labels} lists={lists} type={type} />
    </div>
  )
}
