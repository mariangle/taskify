import KanbanColumn from './_components/kanban-column'
import { Card, CardHeader, CardContent } from '@/components/ui/card'

import TaskService from '@/services/task-service'
import TaskFilter from './_components/task-filter'
import * as React from 'react'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
import { SearchParamsOptions } from '@/lib/search-params'
import TaskForm from '../lists/_components/task-form'

import { MyDrawer } from '@/components/drawer'

interface ExtendedSearchParamsOptions extends SearchParamsOptions {
  view?: 'kanban' | 'table' | 'list' | undefined
}

interface TasksPageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>
}

async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await TaskService.getTasks({ unsorted: true, ...searchParams })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  const incompleteTasks = await TaskService.getTasks({ incomplete: true, unsorted: true, ...searchParams })
  const pendingTasks = await TaskService.getTasks({ pending: true, unsorted: true, ...searchParams })
  const completedTasks = await TaskService.getTasks({ completed: true, unsorted: true, ...searchParams })

  const renderKanban = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn tasks={incompleteTasks} color="bg-orange-500" status="Incomplete" lists={lists} labels={labels} />
        <KanbanColumn tasks={pendingTasks} color="bg-sky-500" status="Pending" lists={lists} labels={labels} />
        <KanbanColumn tasks={completedTasks} color="bg-emerald-500" status="Completed" lists={lists} labels={labels} />
      </div>
    )
  }
  const renderList = () => {
    return (
      <Card>
        <CardHeader className="pb-0">
          <div className="flex-gap">
            <h1 className="font-bold text-xl">Tasks</h1>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul>
            <TaskForm lists={lists} labels={labels} isList />
            {tasks.map((task) => (
              <TaskForm key={task.id} task={task} lists={lists} labels={labels} />
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  const renderTable = () => {
    return 'list'
  }

  return (
    <div className="space-y-2">
      <TaskFilter labels={labels} />
      {searchParams.view === 'list' ? renderList() : searchParams.view === 'table' ? renderTable() : renderKanban()}
      <MyDrawer />
    </div>
  )
}

export default TasksPage
