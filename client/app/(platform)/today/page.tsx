import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import { format } from 'date-fns'

import TaskItem from '@/components/shared/task/task-item'

export default async function TodayPage() {
  const todayTasks = await TaskService.getTasks({ dueDate: format(new Date(), 'dd-MM-yyyy') })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">Today</h1>
        </div>
        <p className="text-muted-foreground text-sm">{todayTasks.length} tasks</p>
      </div>
      <div className="space-y-2">
        {todayTasks.map((task) => (
          <TaskItem key={task.id} task={task} lists={lists} labels={labels} />
        ))}
        <TaskItem lists={lists} labels={labels} />
      </div>
    </div>
  )
}
