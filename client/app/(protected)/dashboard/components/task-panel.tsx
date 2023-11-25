import ListTasks from "../../lists/components/list-tasks"
import PanelHeader from "@/app/(protected)/dashboard/components/panel-header";
import { capitalizeFirstLetter } from "@/helpers/util"
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
    <div className="card">
      <PanelHeader title={title} items={tasks}/>
      {tasks.length === 0 ? (
        <p className="py-2 text-default-500 text-sm">{desc}</p>
      ) : (
        <ListTasks tasks={tasks} />
      )}
    </div>
  );
};