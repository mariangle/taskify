import TaskForm from "@/components/forms/task-form"
import TaskService from "@/helpers/services/task-service"

interface PageProps {
  params: { taskId: string }
}

async function TaskPage({
  params
}: PageProps){
  const task = await TaskService.getTask(params.taskId);

  return (
    <TaskForm task={task}/>
  )
}

export default TaskPage