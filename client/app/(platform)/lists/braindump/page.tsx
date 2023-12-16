import { Card, CardHeader, CardContent } from '@/components/ui/card'

import ListTaskForm from '../_components/task-form'
import EditableTask from '../_components/task-form'

import { Icons } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import TaskService from '@/services/task-service'
import ListService from '@/services/list-service'
import LabelService from '@/services/label-service'

async function BraindumpListPage() {
  const tasks = await TaskService.getTasks({ unsorted: true })
  const lists = await ListService.getLists()
  const labels = await LabelService.getLabels()

  return (
    <Card>
      <CardHeader className="pb-0">
        <div className="flex-gap">
          <h1 className="font-bold text-xl">🧠 Braindump</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Icons.info className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Dump unsorted tasks here to clear your mind and boost productivity. Get everything out of your head!
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <ListTaskForm lists={lists} labels={labels} />
        <ul>
          {tasks.map((task) => (
            <EditableTask key={task.id} task={task} lists={lists} labels={labels} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default BraindumpListPage
