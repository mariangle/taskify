import { statuses } from "@/helpers/constants";
import { TaskResponse } from "@/types";
import Link from "next/link";
import TaskCard from "./task-card";

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
            <span className={`flex items-center justify-center h-2 w-2 -translate-y-1.5 rounded-full bg-${statusInfo?.color}-500`}/>
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
        <div className='space-y-4 lg:space-y-6'>
          {tasks.map((item) => <TaskCard key={item.id} data={item} />)}
        </div>
      </div>
    );
  }

  export default TaskColumn
  