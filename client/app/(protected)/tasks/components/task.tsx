import Badge from "@/components/status-badge";
import PriorityLabel from "@/components/priority-label";
import Link from "next/link";

import { HiOutlineClock } from "react-icons/hi";
import { TaskResponse } from "@/types";
import { formatDistanceToNow } from "@/helpers/util/format";
import ListService from "@/helpers/services/list-service";

interface TaskProps {
    data: TaskResponse
}

export default async function Task({
  data
}: TaskProps) {
  const lists = await ListService.getLists();

  return (
    <div className="h-content shadow-none">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              {data.name}
              <Badge status={data.status} />
            </div>
            <Link href={`/tasks/${data.id}`}>test</Link>
          </div>
          { data.dueDate && (
            <div className="flex gap-2 items-center text-xs">
              <HiOutlineClock className="text-default-500" />
              <p className="text-default-500">Due {formatDistanceToNow({date: new Date(data.dueDate)})}</p>
            </div>
          )}
          { data.priority && <PriorityLabel label={data.priority}/>}
    </div>
  );
}