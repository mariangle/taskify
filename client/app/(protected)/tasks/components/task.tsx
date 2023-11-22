import {
    Card, 
    CardHeader, 
    CardBody, 
    Divider
} from "@nextui-org/react";

import Badge from "@/components/ui/status-badge";
import TaskActions from "./task-actions";
import Link from "next/link";

import { HiOutlineClock,  HiOutlineLocationMarker } from "react-icons/hi";

import { TaskResponse } from "@/types";
import { formatToEEEDDMMM } from "@/helpers/util/formatter";

interface TaskProps {
    data: TaskResponse
}

function Task({
  data
}: TaskProps) {

  return (
    <Card className="h-content shadow-none border dark:border-zinc-800">
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
            <div className="flex gap-2 items-center">
              <HiOutlineClock className="text-default-500" />
              <p className="text-small text-default-500">{formatToEEEDDMMM(data.dueDate)}</p>
            </div>
          )}
        </CardHeader>
        <Divider />
        <CardBody>
        </CardBody>
    </Card>
  );
}

export default Task;