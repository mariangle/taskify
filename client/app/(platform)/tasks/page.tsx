import TaskService from '@/services/task-service';
import TaskColumn from './components/task-column';
import { Suspense } from 'react';
import Spinner from '@/components/ui/spinner';

import * as React from "react"

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
      <div className="grid lg:grid-cols-8 gap-4">
        <div className='col-span-6'>
          <React.Suspense fallback={<Spinner />}>
            <TaskColumn tasks={openTasks} status="Incomplete" />
          </React.Suspense>
          <React.Suspense fallback={<Spinner />}>
            <TaskColumn tasks={completedTasks} status="Completed" />
          </React.Suspense>
        </div>
        <div className='col-span-2'>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;