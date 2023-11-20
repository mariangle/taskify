import ListModal from '@/components/modals/list-modal';
import ListService from '@/helpers/services/list-service';
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
    <div>
        <div className='flex-between'> 
            <h1 className='font-bold text-large'>{title}</h1>
            <ListModal list={list}/>
        </div>
    </div>
  );
}

export default ListPage;