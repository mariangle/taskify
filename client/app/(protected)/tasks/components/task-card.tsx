import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react";
import Badge from "@/components/status-badge";
import PriorityLabel from "@/components/priority-label";
import Link from "next/link";
import TaskCheckbox from "./task-checkbox";

import { HiOutlineClock } from "react-icons/hi";
import { TaskResponse } from "@/types";
import { formatDistanceToNow } from "@/helpers/util/format";
import LabelService from "@/helpers/services/label-service";

interface TaskProps {
    data: TaskResponse
}

export default async function TaskCard({
  data
}: TaskProps) {

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="flex-between">
          <TaskCheckbox task={data} />
          <Link href={`/tasks/${data.id}`} className="bg-border p-1 rounded-full block">
            <MoreHorizontal className="w-2 h-2"/>
          </Link>
        </CardTitle>
      </CardHeader>
      {(data.priority || data.dueDate) && (
      <CardContent className="p-4 pt-0">
          {data.priority && <PriorityLabel label={data.priority} />}
          {data.dueDate && (
            <div className="flex gap-2 items-center text-xs">
              <HiOutlineClock className="text-default-500" />
              <p className="text-default-500">
                Due {formatDistanceToNow({ date: new Date(data.dueDate) })}
              </p>
            </div>
          )}
        </CardContent>
      )}
      labels: {data.labels?.map((label) => (
        <div key={label.id}>
          {label.name}
        </div>
      ))}
    </Card>
  );
}