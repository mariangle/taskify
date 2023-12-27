import TaskItem from '@/components/shared/task/task-item'

import { LabelResponse, ListResponse, TaskResponse } from '@/types'

interface CalendarColumnProps {
  tasks: TaskResponse[]
  labels: LabelResponse[]
  lists: ListResponse[]
  date: string
}

export default function CalendarColumn({ tasks, labels, lists, date }: CalendarColumnProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} labels={labels} lists={lists} type="board" />
      ))}
      <TaskItem lists={lists} labels={labels} date={date} />
    </div>
  )
}
