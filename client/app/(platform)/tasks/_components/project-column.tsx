import Link from "next/link";
import TaskCard from "./task-card";

import { TaskResponse } from "@/types";
import { cn } from "@/lib/utils";

interface ColumnProps {
    tasks: TaskResponse[]
    label: string
    color: string
  }
  
  const TaskColumn = ({ tasks, label, color }: ColumnProps) => {

    return (
      <div className='space-y-4'>
        <div className='flex-between'>
          <div className='flex-gap items-end'>
            <span className={cn(`
            flex items-center justify-center h-2 w-2 -translate-y-2 rounded-full`,
            color ? 'bg-emerald-500' : 'bg-sky-500'
            )}/>
            <div className="flex gap-1">
              <h2 className="font-bold">{label}</h2>
              <p className="text-xs flex items-end mb-[2.5px] text-default-500">({tasks.length})</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    );
  }

  export default TaskColumn
  