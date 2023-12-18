import { Card, CardHeader, CardContent } from '@/components/ui/card'

import ListModal from '@/components/modals/list-modal'
import ListService from '@/services/list-service'
import TaskForm from '../_components/task-form'

import { notFound } from 'next/navigation'
import { defaultEmoji } from '@/lib/constants'
import LabelService from '@/services/label-service'
import TaskService from '@/services/task-service'

interface PageProps {
  params: { listId: string }
}

async function ListPage({ params }: PageProps) {
  const [list, lists, labels, tasks] = await Promise.all([
    ListService.getList(params.listId),
    ListService.getLists(),
    LabelService.getLabels(),
    TaskService.getTasks({ listId: params.listId }),
  ])

  if (!list) return notFound()

  const title = list.emoji ? `${list.emoji} ${list.name}` : `${defaultEmoji} ${list.name}`

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">{title}</h1>
          <ListModal list={list} />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <ul>
          <TaskForm lists={lists} labels={labels} isList />
          {tasks.map((task) => (
            <TaskForm key={task.id} task={task} lists={lists} labels={labels} isList />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
export default ListPage
