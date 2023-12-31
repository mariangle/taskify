import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import ListModal from '@/components/modals/list-modal';

import type { ListResponse } from '@/types';
import { cn } from '@/lib/util/cn';

export default function ListItem({ list }: { list?: ListResponse }) {
  const router = useRouter();
  const path = usePathname();

  if (!list) {
    return (
      <ListModal>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Icons.Add className="w-3 h-3" />
        </Button>
      </ListModal>
    );
  }

  return (
    <Button
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'ml-auto flex justify-start px-2 w-full text-muted-foreground dark:text-muted-foreground dark:hover:bg-accent bg-transparent dark:bg-transparent group',
        path === `/lists/${list.id}` && 'bg-primary/20 dark:bg-primary/20',
      )}
      onClick={() => {
        router.push(`/lists/${list.id}`);
      }}
    >
      <div className="rounded-full bg-primary/10 p-1">
        <span className="h-4 w-4 block text-center text-xs text-foreground">
          {list.name[0]}
        </span>
      </div>
      <span className={cn('ml-2')}>{list.name}</span>
      <div
        role="presentation"
        className="group-hover:block hidden ml-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ListModal list={list}>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icons.More className="w-3 h-3" />
          </Button>
        </ListModal>
      </div>
    </Button>
  );
}
