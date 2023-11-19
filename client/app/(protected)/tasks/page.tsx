import TaskService from "@/helpers/api/task-service"
import Link from "next/link";

async function TasksPage() {

  const tasks = await TaskService.getTasks();
  return (
    <div>
        <Link href={`/tasks/new`}>create</Link>
      {tasks.map((task) => (
        <div key={task.id}>
          <Link href={`/tasks/${task.id}`}>
             {task.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default TasksPage