import TaskForm from "@/app/(protected)/components/task-form"
import TaskService from "@/helpers/services/task-service"
import ListService from "@/helpers/services/list-service"
import LabelService from "@/helpers/services/label-service";

interface PageProps {
  params: { taskId: string }
}

async function TaskPage({
  params
}: PageProps){
  const task = await TaskService.getTask(params.taskId);
  const lists = await ListService.getLists();
  const labels = await LabelService.getLabels();

  return (
    <div className="h-full">
      <TaskForm task={task} lists={lists} labels={labels}/>
      {JSON.stringify(task)}
    </div>
  )
}

export default TaskPage