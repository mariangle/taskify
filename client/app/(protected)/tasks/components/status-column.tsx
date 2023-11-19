import { statuses } from "@/helpers/constants";
import { TaskResponse } from "@/types";
import Badge from "@/components/ui/status-badge";
import Link from "next/link";
import Task from "./task";

interface ColumnProps {
    items: TaskResponse[];
    status: string;
  }
  
  const StatusColumn = ({ items, status }: ColumnProps) => {
    const statusInfo = statuses.find((s) => s.value === status);
  
    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            <Badge status={status} hasNoContent />
            <h2>{statusInfo?.label}</h2>
          </div>
          <Link href={`/tasks/new?status=${statusInfo?.value}`} className=" text-default-400 text-xs">
            Add New +
          </Link>
        </div>
        <div className='space-y-4'>
          {items.map((item) => <Task key={item.id} data={item} />)}
        </div>
      </div>
    );
  }

  export default StatusColumn
  