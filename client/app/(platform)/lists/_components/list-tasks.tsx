import { TaskResponse } from "@/types"
import ListTaskForm from "./editable-task"

interface ListTasksProps {
    tasks: TaskResponse[] | []
}

const ListTasks = ({
    tasks
}: ListTasksProps) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => <ListTaskForm key={task.id} task={task}/>)}
    </ul>
  )
}

export default ListTasks