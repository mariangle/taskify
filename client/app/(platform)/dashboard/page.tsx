import TaskPanel from "./_components/task-panel";
import CalendarPanel from "./_components/calendar-panel";
import ProjectsPanel from "./_components/projects-panel";
import LineChart from "./_components/line-chart";
import AnalyticsPanel from "./_components/analytics-panel";
import TaskService from "@/services/task-service";

export default async function DashboardPage() {
  const tasks = await TaskService.getTasks();
  const upcomingTasks = await TaskService.getTasks({ upcoming: true });
  const overdueTasks = await TaskService.getTasks({ overdue: true });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      <div className="lg:col-span-2 space-y-4">
        <ProjectsPanel />        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-4">
            <TaskPanel type="overdue" tasks={overdueTasks}/>
            <AnalyticsPanel tasks={tasks}/>
          </div>
          <div>
            <TaskPanel type="upcoming" tasks={upcomingTasks} /> 
          </div>
        </div>
      </div>
      <div className="grid lg:col-span-1 lg:gap-6 gap-4">
        <CalendarPanel tasks={tasks}/>
        { /* TODO: Not the most best way.. Need CreatedAt property.*/}
        <LineChart tasks={tasks}/>
      </div>
    </div>
  );
}