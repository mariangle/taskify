import KanbanColumn from './_components/kanban-column'
import TaskService from '@/services/task-service'
import TaskFilter from './_components/task-filter'
import * as React from 'react'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import { MyDrawer } from '@/components/drawer'

interface TasksPageProps {
  searchParams: { [key: string]: string | boolean }
}

async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await TaskService.getTasks(searchParams)
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  const incompleteTasks = tasks.filter((task) => task.status === 'Incomplete')
  const pendingTasks = tasks.filter((task) => task.status === 'InProgress')
  const completedTasks = tasks.filter((task) => task.status === 'Completed')

  return (
    <div className="space-y-2">
      <TaskFilter labels={labels} />

      <MyDrawer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn tasks={incompleteTasks} color="bg-orange-500" status="Incomplete" lists={lists} labels={labels} />
        <KanbanColumn tasks={pendingTasks} color="bg-sky-500" status="In Progress" lists={lists} labels={labels} />
        <KanbanColumn tasks={completedTasks} color="bg-emerald-500" status="Completed" lists={lists} labels={labels} />
      </div>
    </div>
  )
}

export default TasksPage
