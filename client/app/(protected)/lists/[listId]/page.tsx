import ListModal from '@/components/modals/list-modal';
import ListService from '@/helpers/services/list-service';
import ListTasks from '../components/list-tasks';

import { notFound } from 'next/navigation';
import { defaultEmoji } from '@/helpers/constants';

interface PageProps {
    params: { listId: string }
}

async function ListPage({
    params
} : PageProps) {
  const list = await ListService.getList(params.listId);

  if (!list) return notFound();

  const title = list.emoji ? `${list.emoji} ${list.name}` : `${defaultEmoji} ${list.name}`
  
  return (
    <div className='rounded-xl border p-4'>
        <div className='flex-gap my-2'>
            <h1 className='font-bold text-xl'>{title}</h1>
            <ListModal list={list}/>
        </div>
        <ListTasks tasks={list.tasks}/>
    </div>
  );
}

export default ListPage;