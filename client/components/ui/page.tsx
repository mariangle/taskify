import TaskItem from '../shared/task/task-item'
import LabelItem from '../shared/label/label-item'

import type { LabelResponse, ListResponse, TaskResponse } from '@/types'

export const PageList = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full max-w-screen-md mx-auto">{children}</div>
}

export const PageHeading = ({ children, items }: { children: React.ReactNode; items?: any[] }) => {
  return (
    <div className="flex-gap">
      <h1 className="font-bold text-xl">{children}</h1>

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
