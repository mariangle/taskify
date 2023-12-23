import ListModal from '@/components/modals/list-modal'
import ListService from '@/services/list-service'
import TaskItem from '@/components/shared/task/task-item'

import LabelService from '@/services/label-service'
import TaskService from '@/services/task-service'
import { ExtendedSearchParamsOptions } from '@/lib/util/filter'

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
    <>
      <div className="space-y-2">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">{list.name}</h1>
          <ListModal list={list} />
        </div>
        <p className="text-muted-foreground text-sm">This is where your unsorted tasks reside.</p>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} lists={lists} labels={labels} />
        ))}
        <TaskItem labels={labels} lists={lists} />
      </ul>
    </>
  )
}
export default ListPage
