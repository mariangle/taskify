import TaskService from '@/helpers/services/task-service';
import StatusColumn from './components/status-column';
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
        <StatusColumn items={openTasks} status="Incomplete" />
        <StatusColumn items={inProgressTasks} status="InProgress" />
        <StatusColumn items={completedTasks} status="Completed" />
      </div>
    </div>
  );
}

export default TasksPage;