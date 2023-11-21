import TaskService from '@/helpers/services/task-service';
import TaskColumn from './components/task-column';
import CommandModal from '@/components/modals/command-modal';

async function TasksPage() {
  const tasks = await TaskService.getTasks();
  
  const openTasks = tasks.filter((task) => task.status === 'Incomplete');
  const inProgressTasks = tasks.filter((task) => task.status === 'InProgress');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  return (
    <div>
      <CommandModal />
      <div className="grid lg:grid-cols-3 gap-4">
        <TaskColumn items={openTasks} status="Incomplete" />
        <TaskColumn items={inProgressTasks} status="InProgress" />
        <TaskColumn items={completedTasks} status="Completed" />
      </div>
    </div>
  );
}

export default TasksPage;