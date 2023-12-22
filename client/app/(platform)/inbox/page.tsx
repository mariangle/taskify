import * as React from 'react'

import KanbanColumn from './_components/board-column'
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card'

import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import { ExtendedSearchParamsOptions } from '@/lib/util/filter'
import TaskForm from '@/components/task/task-board-item'
import FilterSummary from '@/components/filter/filter-summary'

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4s">
        <KanbanColumn tasks={incompleteTasks} color="bg-orange-500" status="Incomplete" lists={lists} labels={labels} />
        <KanbanColumn tasks={pendingTasks} color="bg-sky-500" status="Pending" lists={lists} labels={labels} />
        <KanbanColumn tasks={completedTasks} color="bg-emerald-500" status="Completed" lists={lists} labels={labels} />
      </div>
    )
  }
  const renderList = () => {
    const incompleteTasks = tasks.filter((t) => t.status !== 'Completed')

    return (
      <Card>
        <CardHeader className="pb-0">
          <div className="flex-gap">
            <h1 className="font-bold text-xl">Inbox</h1>
          </div>
          <CardDescription>This is where your unsorted tasks reside.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <ul>
            {incompleteTasks.map((task) => (
              <TaskForm key={task.id} task={task} lists={lists} labels={labels} />
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  const renderTable = () => {
    return 'table'
  }

  return (
    <div className="space-y-2">
      <FilterSummary labels={labels} />
      {searchParams.view === 'kanban' ? renderKanban() : searchParams.view === 'table' ? renderTable() : renderList()}
    </div>
  )
}

export default TasksPage
