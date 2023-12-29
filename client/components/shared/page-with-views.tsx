import * as React from 'react'

import { TaskService } from '@/services/task-service'
import { ExtendedSearchParamsOptions } from '@/lib/util/filter'
import { PageList, PageBoard, PageTable, PageHeading, TaskList } from '@/components/ui/page'
import type { LabelResponse, ListResponse, TaskResponse } from '@/types'

interface PageWithViewsProps {
  searchParams: Partial<ExtendedSearchParamsOptions>
  tasks: TaskResponse[]
  labels: LabelResponse[]
  lists: ListResponse[]
  heading: string
  options?: {
    board?: Partial<ExtendedSearchParamsOptions>
    list?: Partial<ExtendedSearchParamsOptions>
    table?: Partial<ExtendedSearchParamsOptions>
  }
}

export default function PageWithViews({ searchParams, tasks, labels, lists, heading, options }: PageWithViewsProps) {
  const ListView = () => {
    return (
      <PageList>
        <PageHeading items={tasks}>{heading}</PageHeading>
        <TaskList tasks={tasks} labels={labels} lists={lists} />
      </PageList>
    )
  }

  const TableView = () => {
    // TODO: Table View
    return (
      <PageTable>
        <PageHeading items={tasks}>{heading}</PageHeading>
        Table view coming soon...
      </PageTable>
    )
  }

  const BoardView = async () => {
    const incompleteTasks = await TaskService.getTasks({
      ...searchParams,
      incomplete: true,
      unsorted: options?.board?.unsorted,
      listId: options?.board?.listId,
      dueDate: options?.board?.dueDate,
    })
    const pendingTasks = await TaskService.getTasks({
      ...searchParams,
      pending: true,
      unsorted: options?.board?.unsorted,
      listId: options?.board?.listId,
      dueDate: options?.board?.dueDate,
    })
    const completedTasks = await TaskService.getTasks({
      ...searchParams,
      completed: true,
      unsorted: options?.board?.unsorted,
      listId: options?.board?.listId,
      dueDate: options?.board?.dueDate,
    })

    return (
      <PageBoard>
        <div className="space-y-2">
          <PageHeading color="bg-yellow-500" items={incompleteTasks} level="h3" className="text-md">
            New
          </PageHeading>
          <TaskList tasks={incompleteTasks} lists={lists} labels={labels} type="board" />
        </div>
        <div className="space-y-2">
          <PageHeading color="bg-sky-500" items={pendingTasks} level="h3" className="text-md">
            In Progress
          </PageHeading>
          <TaskList tasks={pendingTasks} lists={lists} labels={labels} type="board" />
        </div>
        <div className="space-y-2">
          <PageHeading color="bg-emerald-500" items={completedTasks} level="h3" className="text-md">
            Completed
          </PageHeading>
          <TaskList tasks={completedTasks} lists={lists} labels={labels} type="board" />
        </div>
      </PageBoard>
    )
  }

  return searchParams.view === 'board' ? BoardView() : searchParams.view === 'table' ? TableView() : ListView()
}
