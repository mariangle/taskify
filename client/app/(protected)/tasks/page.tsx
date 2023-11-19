import TaskService from '@/helpers/services/task-service';
import StatusColumn from './components/status-column';
import CommandModal from '@/components/modals/command-modal';

async function TasksPage() {
  const tasks = await TaskService.getTasks();
  
  const todoTasks = tasks.filter((task) => task.status === 'Todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'InProgress');
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  return (
    <div>
      <CommandModal />
      <div className="grid lg:grid-cols-3 gap-4">
        <StatusColumn items={todoTasks} status="Todo" />
        <StatusColumn items={inProgressTasks} status="InProgress" />
        <StatusColumn items={completedTasks} status="Completed" />
      </div>
    </div>
  );
}

export default TasksPage;