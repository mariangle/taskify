import {
    Card, 
    CardHeader, 
    CardBody, 
    Divider
} from "@nextui-org/react";

import Badge from "@/components/ui/status-badge";
import PriorityLabel from "@/components/priority-label";
import TaskActions from "./task-actions";
import Link from "next/link";

import { HiOutlineClock } from "react-icons/hi";
import { TaskResponse } from "@/types";
import { formatDistanceToNow } from "@/helpers/util/format";

interface TaskProps {
    data: TaskResponse
}

export default function Task({
  data
}: TaskProps) {

  return (
    <Card className="h-content shadow-none">
        <CardHeader className="block space-y-2">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Link href={`/tasks/${data.id}`} className="text-md">
                {data.name}
              </Link>
              <Badge status={data.status} />
            </div>
            <TaskActions id={data.id}/>
          </div>
          { data.dueDate && (
            <div className="flex gap-2 items-center text-xs">
              <HiOutlineClock className="text-default-500" />
              <p className="text-default-500">Due {formatDistanceToNow({date: new Date(data.dueDate)})}</p>
            </div>
          )}
          { data.priority && <PriorityLabel label={data.priority}/>}
        </CardHeader>
        <Divider />
        <CardBody>
        </CardBody>
    </Card>
  );
}