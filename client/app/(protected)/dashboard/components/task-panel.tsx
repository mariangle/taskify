import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

import ListTasks from "../../lists/components/list-tasks"
import { capitalizeFirstLetter } from "@/util"
import { TaskResponse } from "@/types"

interface DashboardTasksList{
  tasks: TaskResponse[] | [],
  type: 'overdue' | 'upcoming',
}

export default function TaskPanel({
  tasks,
  type,
} : DashboardTasksList){
  const titleEmoji = type === 'upcoming' ? '📥' : '⌛';
  const title = `${titleEmoji} ${capitalizeFirstLetter(type)} Tasks`;
  const desc = type === 'upcoming' ? "All caught up! ⭐ What's next on your agenda?" : 'Great job! You are all set! 🎉';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex-gap">
          {title} 
            <span className="text-xs flex items-end pb-1 text-default-500">({tasks.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
      {tasks.length === 0 ? (
        <CardDescription>{desc}</CardDescription>
      ) : (
        <ListTasks tasks={tasks} />
      )}
      </CardContent>
    </Card>
  );
};