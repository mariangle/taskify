import ListTask from "./list-task" 
import { TaskResponse } from "@/types"

interface ListTasksProps {
    tasks: TaskResponse[] | []
}

const ListTasks = ({
    tasks
}: ListTasksProps) => {
  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <ListTask key={task.id} task={task} isLast={index === tasks.length - 1} />
      ))}
    </ul>
  )
}

export default ListTasks