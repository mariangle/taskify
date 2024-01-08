import * as React from 'react';

import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import AlertModal from '@/components/modals/alert-modal';

import type { Subtask, Task } from '@/types';
import { useMounted } from '@/hooks/use-mounted';
import { SubtaskService } from '@/services/subtask-service';
import { handleError } from '@/lib/util/error';

interface SubtaskActionsProps {
  task: Task;
  subtask: Subtask;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubtaskActions({
  task,
  subtask,
  setOpen,
}: SubtaskActionsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isMounted = useMounted();
  const router = useRouter();

  const onEdit = () => setOpen(true);

  const onDelete = async (subtaskId: string) => {
    setIsLoading(true);
    try {
      await SubtaskService.deleteSubtask(task.id, subtaskId);
      toast.success('Deleted!');
      router.refresh();
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={async () => onDelete(subtask.id)}
        loading={isLoading}
        description="Deleting the Subtask will result in the removal of all labels associated with a task."
      />
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="w-5 h-5 rounded-full">
            <Icons.More className="w-5 h-5 p-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onSelect={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={onEdit}>
            <Icons.Pencil className="mr-2 h-3 w-3 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => onDelete(subtask.id)}
            className="text-destructive"
            onSelect={(e) => e.preventDefault()}
          >
            <Icons.Trash className="mr-2 h-3 w-3" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
