import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card'

import { format } from 'date-fns'

import TaskForm from '@/components/task/task-board-item'

export default async function TodayPage() {
  const todayTasks = await TaskService.getTasks({ dueDate: format(new Date(), 'dd-MM-yyyy') })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <div>
      <Card>
        <CardHeader className="pb-0">
          <div className="flex-gap">
            <h1 className="font-bold text-xl">Today</h1>
          </div>
          <CardDescription>{todayTasks.length} tasks</CardDescription>
        </CardHeader>
      </Card>
      <ul>
        {todayTasks.map((task) => (
          <TaskForm key={task.id} task={task} lists={lists} labels={labels} />
        ))}
      </ul>
    </div>
  )
}
