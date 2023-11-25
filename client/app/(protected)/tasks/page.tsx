import TaskService from '@/helpers/services/task-service';
import TaskColumn from './components/task-column';

async function TasksPage() {
  const tasks = await TaskService.getTasks();
  
  const openTasks = tasks.filter((task) => task.status === 'Incomplete');
  const inProgressTasks = tasks.filter((task) => task.status === 'InProgress');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  return (
    <div className='space-y-2 lg:space-y-4'>
      <div className="grid lg:grid-cols-3 gap-4">
        <TaskColumn tasks={openTasks} status="Incomplete" />
        <TaskColumn tasks={inProgressTasks} status="InProgress" />
        <TaskColumn tasks={completedTasks} status="Completed" />
      </div>
    </div>
  );
}

export default TasksPage;