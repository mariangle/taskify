import ListService from '@/services/list-service'

import LabelService from '@/services/label-service'
import TaskService from '@/services/task-service'
import { ExtendedSearchParamsOptions } from '@/lib/util/filter'

import { PageList, PageHeading, TaskList } from '@/components/ui/page'

interface PageProps {
  params: { listId: string }
  searchParams: Partial<ExtendedSearchParamsOptions>
}

async function ListPage({ params, searchParams }: PageProps) {
  const [list, lists, labels, tasks] = await Promise.all([
    ListService.getList(params.listId),
    ListService.getLists(),
    LabelService.getLabels(),
    TaskService.getTasks({ listId: params.listId, ...searchParams }),
  ])

  if (!list) return null

  return (
    <PageList>
      <PageHeading items={tasks}>{list.name}</PageHeading>
      <TaskList tasks={tasks} labels={labels} lists={lists} />
    </PageList>
  )
}
export default ListPage
