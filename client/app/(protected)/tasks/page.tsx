import TaskService from '@/services/task-service';
import TaskColumn from './components/task-column';

interface TasksPageProps {
  searchParams: { [key: string]: string | boolean }
}

async function TasksPage({
  searchParams
}: TasksPageProps) {
  const tasks = await TaskService.getTasks(searchParams);

  // TODO: Reversing to get newest but probably should do it through API
  const openTasks = tasks.filter((task) => task.status === 'Incomplete').reverse();
  const completedTasks = tasks.filter((task) => task.status === 'Completed').reverse();

  return (
    <div className='space-y-2 lg:space-y-4'>
      <div className="grid lg:grid-cols-3 gap-4">
        <TaskColumn tasks={openTasks} status="Incomplete" />
        <TaskColumn tasks={completedTasks} status="Completed" />
        <div>
          chatbot here
        </div>
      </div>
    </div>
  );
}

export default TasksPage;