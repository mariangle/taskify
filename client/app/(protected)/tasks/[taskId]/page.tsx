import TaskForm from "@/components/forms/task-form"
import TaskService from "@/helpers/services/task-service"

async function TaskPage({
  params
}: {
  params: { taskId: string }
}){
  const task = await TaskService.getTask(params.taskId);

  return (
    <TaskForm task={task}/>
  )
}

export default TaskPage