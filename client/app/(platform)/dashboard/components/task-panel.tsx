"use client"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ListTasks from "../../lists/components/list-tasks"
import { capitalizeFirstLetter } from "@/util"
import { TaskResponse } from "@/types"
import { useMounted } from "@/hooks/use-mounted"

interface DashboardTasksList{
  tasks: TaskResponse[] | [],
  type: 'overdue' | 'upcoming',
}

export default function TaskPanel({
  tasks,
  type,
} : DashboardTasksList){
  const mounted = useMounted();

  if (!mounted) return null;

  const titleEmoji = type === 'upcoming' ? '📥' : '⌛';
  const title = `${titleEmoji} ${capitalizeFirstLetter(type)} Tasks`;
  const desc = type === 'upcoming' ? "All caught up! ⭐ What's next on your agenda?" : 'Great job! You are all set! 🎉';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex-gap pb-0">
          {title} 
            <span className="text-xs flex items-end pb-1 text-default-500">({tasks.length})</span>
        </CardTitle>
        {tasks.length === 0 
          ? (
            <CardDescription>
              {desc}
            </CardDescription>
          ) : (
            <ListTasks tasks={tasks} />
          )}
      </CardHeader>
    </Card>
  );
};