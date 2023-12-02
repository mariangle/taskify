import Link from "next/link";
import TaskCard from "./task-card";

import { statuses } from "@/lib/constants";
import { TaskResponse } from "@/types";
import { cn } from "@/lib/utils";

interface ColumnProps {
    tasks: TaskResponse[];
    status: string;
  }
  
  const TaskColumn = ({ tasks, status }: ColumnProps) => {
    const statusInfo = statuses.find((s) => s.value === status);

    return (
      <div className='space-y-4'>
        <div className='flex-between'>
          <div className='flex-gap items-end'>
            <span className={cn(`
            flex items-center justify-center h-2 w-2 -translate-y-2 rounded-full`,
            status === 'Completed' ? 'bg-emerald-500' : 'bg-sky-500'
            )}/>
            <div className="flex gap-1">
              <h2 className="font-bold">{statusInfo?.label}</h2>
              <p className="text-xs flex items-end mb-[2.5px] text-default-500">({tasks.length})</p>
            </div>
          </div>
          <Link 
            href={{
              pathname: '/tasks/new',
              query: { status: statusInfo?.value}
            }} 
            className=" text-default-400 text-xs">
            Add New +
          </Link>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {tasks.map((task) => <TaskCard key={task.id} task={task} />)}
        </div>
      </div>
    );
  }

  export default TaskColumn
  