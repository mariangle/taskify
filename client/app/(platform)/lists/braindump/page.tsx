import { Card, CardHeader, CardContent } from '@/components/ui/card'

import TaskForm from '../_components/task-form'

import { Icons } from '@/components/icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import TaskService from '@/services/task-service'
import ListService from '@/services/list-service'
import LabelService from '@/services/label-service'

async function BraindumpListPage() {
  const [tasks, lists, labels] = await Promise.all([
    TaskService.getTasks({ unsorted: true }),
    ListService.getLists(),
    LabelService.getLabels(),
  ])

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
        <ul>
          {tasks.map((task) => (
            <TaskForm key={task.id} task={task} lists={lists} labels={labels} hasBorder />
          ))}
        </ul>
        <TaskForm lists={lists} labels={labels} hasBorder />
      </CardContent>
    </Card>
  )
}

export default BraindumpListPage
