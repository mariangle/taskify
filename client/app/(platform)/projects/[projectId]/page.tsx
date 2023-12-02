import ProjectService from '@/services/project-service';
import KanbanColumn from './kanban-column';

import { notFound } from 'next/navigation';
import TaskService from '@/services/task-service';

interface PageProps {
    params: { projectId: string }
}

async function ListPage({
    params
} : PageProps) {
  const project = await ProjectService.getProject(params.projectId);

  const tasks = await TaskService.getTasks({ projectId: params.projectId})

  if (!project) return notFound();
  
  return (
    <div>
        <div className='grid md:grid-cols-3'>
            <KanbanColumn label='Todo' tasks={tasks}/>
            <div></div>
            <div></div>
        </div>
    </div>
  );
}

export default ListPage;