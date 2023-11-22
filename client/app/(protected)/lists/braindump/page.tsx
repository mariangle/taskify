import ListTasks from '../components/list-tasks';
import Tooltip from '@/components/ui/tooltip';

import TaskService from '@/helpers/services/task-service';

async function BraindumpListPage() {
  const tasks = await TaskService.getTasks({ unsorted: true });

  return (
    <div className='card rounded-xl border p-4'>
        <div className='flex-gap my-2'> 
            <h1 className='font-bold text-xl'>🧠 Braindump</h1>
            <Tooltip content='Dump unsorted tasks here to clear your mind and boost productivity. Get everything out of your head!'/>
        </div>
        <ListTasks tasks={tasks}/>
    </div>
  );
}

export default BraindumpListPage;