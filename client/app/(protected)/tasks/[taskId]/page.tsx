import TaskForm from "@/app/(protected)/components/task-form"
import TaskService from "@/helpers/services/task-service"
import ListService from "@/helpers/services/list-service"

interface PageProps {
  params: { taskId: string }
}

async function TaskPage({
  params
}: PageProps){
  const task = await TaskService.getTask(params.taskId);
  const lists = await ListService.getLists();

  return (
    <TaskForm task={task} lists={lists} isModal={false}/>
  )
}

export default TaskPage