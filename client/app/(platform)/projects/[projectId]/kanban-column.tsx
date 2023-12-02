import { TaskResponse } from "@/types"

interface KanbanColumnProps {
    tasks: TaskResponse[]
    label: string
}

export default function KanbanColumn({
    tasks,
    label
} : KanbanColumnProps ){
    return (
        <div>
            <div>
                {label}
            </div>
            <div>
                {tasks?.map((task) => <div key={task.id}>{JSON.stringify(task)}</div>)}
            </div>
        </div>
    )
}