import ListTasks from '../components/list-tasks';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import TaskService from '@/helpers/services/task-service';

async function BraindumpListPage() {
  const tasks = await TaskService.getTasks({ unsorted: true });

  return (
    <div className='rounded-xl border p-4'>
        <div className='flex-gap my-2'> 
            <h1 className='font-bold text-xl'>🧠 Braindump</h1>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger><Info className='w-4 h-4'/></TooltipTrigger>
              <TooltipContent>
                <p>Dump unsorted tasks here to clear your mind and boost productivity. Get everything out of your head!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <ListTasks tasks={tasks}/>
    </div>
  );
}

export default BraindumpListPage;