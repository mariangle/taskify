import TaskPanel from "./components/task-panel";
import CalendarPanel from "./components/calendar-panel";
import ProjectsPanel from "./components/projects-panel";
import AnalyticsPanel from "./components/analytics-panel";
import TaskService from "@/helpers/services/task-service";

export default async function DashboardPage() {
  const tasks = await TaskService.getTasks();
  const upcomingTasks = await TaskService.getTasks({ upcoming: true });
  const overdueTasks = await TaskService.getTasks({ overdue: true });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="lg:col-span-2">
        <AnalyticsPanel />
      </div>
      <div className="lg:col-span-1">
        <CalendarPanel tasks={tasks}/>
      </div>
      <div className="col-span-1 lg:col-span-2 grid lg:grid-cols-2 gap-4 lg:gap-6">
        <div>
          <TaskPanel type="overdue" tasks={overdueTasks} />
        </div>
        <div>
          <TaskPanel type="upcoming" tasks={upcomingTasks} />
        </div>
      </div>
      <div className="lg:col-span-1">
        <ProjectsPanel />
      </div>
    </div>
  );
}
