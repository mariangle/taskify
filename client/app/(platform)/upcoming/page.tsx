import TaskForm from '@/components/task/task-form'
import TaskService from '@/services/task-service'
import LabelService from '@/services/label-service'
import ListService from '@/services/list-service'
const page = async () => {
  const labels = await LabelService.getLabels()
  const lists = await ListService.getLists()

  return (
    <div>
      <TaskForm lists={lists} labels={labels} />
    </div>
  )
}

export default page
