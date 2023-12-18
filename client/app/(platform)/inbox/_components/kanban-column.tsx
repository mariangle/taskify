import { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { cn } from '@/lib/util/cn'
import TaskForm from '../../lists/_components/task-form'
import { Card, CardHeader } from '@/components/ui/card'

interface ColumnProps {
  tasks: TaskResponse[]
  lists: ListResponse[]
  labels: LabelResponse[]
  status: 'Incomplete' | 'Pending' | 'Completed'
  color: string
}

const KanbanColumn = ({ tasks, status, color, lists, labels }: ColumnProps) => {
  return (
    <div className="space-y-4">
      <div className="flex-between">
        <div className="flex-gap items-end">
          <span className={cn('flex items-center justify-center h-2 w-2 -translate-y-2 rounded-full', color)} />
          <div className="flex gap-1">
            <h2 className="font-bold">{status}</h2>
            <p className="text-xs flex items-end mb-[2.5px] text-default-500">({tasks.length})</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {status === 'Incomplete' && (
          <Card>
            <CardHeader className="p-0 px-4">
              <TaskForm labels={labels} lists={lists} />
            </CardHeader>
          </Card>
        )}
        {tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader className="p-0 px-4">
              <TaskForm task={task} labels={labels} lists={lists} />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default KanbanColumn
