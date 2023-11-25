import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PriorityLabel from "@/components/priority-label";
import Link from "next/link";
import TaskCheckbox from "./task-checkbox";

import { HiOutlineClock } from "react-icons/hi";
import { TaskResponse } from "@/types";
import { formatDistanceToNow } from "@/util/format";
import { isOverdue } from "@/util/format";

interface TaskProps {
    task: TaskResponse
}

export default async function TaskCard({
  task
}: TaskProps) {
  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="flex-between">
          <div className="text-base">
            <TaskCheckbox task={task} />
            <span className={isOverdue({ date: task.dueDate, status: task.status}) ? "text-destructive" : ""}>{task.name}</span>
          </div>
          <Link href={`/tasks/${task.id}`} className="bg-border p-1 rounded-full block">
            <MoreHorizontal className="w-2 h-2"/>
          </Link>
        </CardTitle>
      </CardHeader>
      {(task.priority || task.dueDate) && (
      <CardContent className="p-4 pt-0 space-y-1">
          {task.priority && <PriorityLabel label={task.priority} />}
          {task.dueDate && (
            <div className="flex gap-2 items-center text-xs">
              <HiOutlineClock className="h-3 w-3" />
              <p className="text-default-500">
                Due {formatDistanceToNow({ date: new Date(task.dueDate) })}
              </p>
            </div>
          )}
          { task?.labels && task.labels?.length > 0 && (
          <div className="flex-gap-sm">
            <Tags className="h-3 w-3" />
            <div className="flex-gap">
              {task.labels.map((label) => (
                <Badge key={label.id} variant={'outline'} className="flex-gap">  
                  <div className="h-2 w-2 rounded-full border" style={{ backgroundColor: label.color }} />
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}