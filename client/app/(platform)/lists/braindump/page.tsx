import { Card, CardHeader, CardContent } from '@/components/ui/card';

import ListTasks from '../_components/list-tasks';
import { Icons } from '@/components/icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import TaskService from '@/services/task-service';

async function BraindumpListPage() {
  const tasks = await TaskService.getTasks({ unsorted: true });

  return (
    <Card>
      <CardHeader>
        <div className='flex-gap my-2'> 
              <h1 className='font-bold text-xl'>🧠 Braindump</h1>
              <TooltipProvider>
              <Tooltip>
                <TooltipTrigger><Icons.info className='w-4 h-4'/></TooltipTrigger>
                <TooltipContent>
                  <p>Dump unsorted tasks here to clear your mind and boost productivity. Get everything out of your head!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
      </CardHeader>
      <CardContent>
        <ListTasks tasks={tasks}/>
      </CardContent>
    </Card>
  );
}

export default BraindumpListPage;