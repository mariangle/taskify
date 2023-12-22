import { Card, CardHeader, CardContent } from '@/components/ui/card'

import ListModal from '@/components/modals/list-modal'
import ListService from '@/services/list-service'
import TaskForm from '@/components/task/task-board-item'

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
    <Card className="w-full">
      <CardHeader className="pb-0">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">{list.name}</h1>
          <ListModal list={list} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul>
          {tasks.map((task) => (
            <TaskForm key={task.id} task={task} lists={lists} labels={labels} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
export default ListPage
