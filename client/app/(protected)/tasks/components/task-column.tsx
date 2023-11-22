import { statuses } from "@/helpers/constants";
import { TaskResponse } from "@/types";
import Badge from "@/components/ui/status-badge";
import Link from "next/link";
import Task from "./task";

interface ColumnProps {
    tasks: TaskResponse[];
    status: string;
  }
  
  const TaskColumn = ({ tasks, status }: ColumnProps) => {
    const statusInfo = statuses.find((s) => s.value === status);
  
    return (
      <div className='space-y-4 lg:space-y-6'>
        <div className='flex-between'>
          <div className='flex-gap items-end'>
            <Badge status={status} hasNoContent />
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
          {tasks.map((item) => <Task key={item.id} data={item} />)}
        </div>
      </div>
    );
  }

  export default TaskColumn
  