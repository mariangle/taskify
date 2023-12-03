import TaskService from '@/services/task-service';
import TaskColumn from './components/project-column';
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

  return (
    <div className='space-y-2 lg:space-y-4'>
      <div className="grid lg:grid-cols-8 gap-4">
        <div className='col-span-6'>

        </div>
        <div className='col-span-2'>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;