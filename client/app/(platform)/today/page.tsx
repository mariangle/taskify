import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'

import { format } from 'date-fns'

import { PageList, PageHeading, TaskList } from '@/components/ui/page'

export default async function Today() {
  const tasks = await TaskService.getTasks({ dueDate: format(new Date(), 'dd-MM-yyyy') })
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <PageList>
      <PageHeading items={tasks}>Today</PageHeading>
      <TaskList tasks={tasks} labels={labels} lists={lists} />
    </PageList>
  )
}
