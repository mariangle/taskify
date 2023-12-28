import * as React from 'react'

import BoardColumn from './_components/board-column'

import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import { ExtendedSearchParamsOptions } from '@/lib/util/filter'
import TaskItem from '@/components/shared/task/task-item'
import FilterSummary from '@/components/shared/filter/filter-summary'

import { PageList, PageHeading, TaskList } from '@/components/ui/page'

interface TasksPageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>
}

async function TasksPage({ searchParams }: TasksPageProps) {
  const tasks = await TaskService.getTasks({ unsorted: true, ...searchParams })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  const renderBoard = async () => {
    const incompleteTasks = await TaskService.getTasks({ incomplete: true, unsorted: true, ...searchParams })
    const pendingTasks = await TaskService.getTasks({ pending: true, unsorted: true, ...searchParams })
    const completedTasks = await TaskService.getTasks({ completed: true, unsorted: true, ...searchParams })

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BoardColumn tasks={incompleteTasks} color="bg-orange-500" status="Incomplete" lists={lists} labels={labels} />
        <BoardColumn tasks={pendingTasks} color="bg-sky-500" status="Pending" lists={lists} labels={labels} />
        <BoardColumn tasks={completedTasks} color="bg-emerald-500" status="Completed" lists={lists} labels={labels} />
      </div>
    )
  }
  const renderList = () => {
    const incompleteTasks = tasks.filter((t) => t.status !== 'Completed')

    return (
      <PageList>
        <PageHeading items={incompleteTasks}>Inbox</PageHeading>
        <TaskList tasks={incompleteTasks} labels={labels} lists={lists} />
      </PageList>
    )
  }

  return (
    <div>
      <FilterSummary labels={labels} />
      {searchParams.view === 'board' ? renderBoard() : renderList()}
    </div>
  )
}

export default TasksPage
