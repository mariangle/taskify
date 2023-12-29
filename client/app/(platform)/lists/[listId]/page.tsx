import { ListService } from '@/services/list-service'

import { LabelService } from '@/services/label-service'
import { TaskService } from '@/services/task-service'
import { ExtendedSearchParamsOptions } from '@/lib/util/filter'

import PageWithViews from '@/components/shared/page-with-views'

interface PageProps {
  params: { listId: string }
  searchParams: Partial<ExtendedSearchParamsOptions>
}

export default async function List({ params, searchParams }: PageProps) {
  const [list, lists, labels, tasks] = await Promise.all([
    ListService.getList(params.listId),
    ListService.getLists(),
    LabelService.getLabels(),
    TaskService.getTasks({ ...searchParams, listId: params.listId, incomplete: searchParams.incomplete ?? true }),
  ])

  if (!list) return null

  return (
    <PageWithViews
      searchParams={searchParams}
      tasks={tasks}
      labels={labels}
      lists={lists}
      heading="Inbox"
      options={{ board: { listId: list.id } }}
    />
  )
}
