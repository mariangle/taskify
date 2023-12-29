import * as React from 'react'

import { TaskService } from '@/services/task-service'
import { LabelService } from '@/services/label-service'
import { ListService } from '@/services/list-service'

import { ExtendedSearchParamsOptions } from '@/lib/util/filter'

import PageWithViews from '@/components/shared/page-with-views'

interface PageProps {
  searchParams: Partial<ExtendedSearchParamsOptions>
}

export default async function Inbox({ searchParams }: PageProps) {
  const tasks = await TaskService.getTasks({
    ...searchParams,
    unsorted: true,
    incomplete: searchParams.incomplete ?? true,
  })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <PageWithViews
      searchParams={searchParams}
      tasks={tasks}
      labels={labels}
      lists={lists}
      heading="Inbox"
      options={{ board: { unsorted: true } }}
    />
  )
}
