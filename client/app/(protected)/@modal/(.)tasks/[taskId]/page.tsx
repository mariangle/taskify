import TaskModal from "@/components/modals/task-modal"
import TaskService from "@/helpers/services/task-service"
import ListService from "@/helpers/services/list-service"

// This route intercepts /tasks/[taskId]
// Have to use static route then dynamic route for it to work
// https://github.com/vercel/next.js/issues/52533

interface PageProps {
    params: { taskId: string }
  }
  
  async function TaskModalPage({
    params
  }: PageProps){
    const task = await TaskService.getTask(params.taskId);
    const lists = await ListService.getLists();

    return <TaskModal task={task} lists={lists}/>
  }
  
  export default TaskModalPage