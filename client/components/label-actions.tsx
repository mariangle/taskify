import * as React from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';

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

import type { Label } from '@/types';
import { useMounted } from '@/hooks/use-mounted';
import { LabelService } from '@/services/label-service';
import { handleError } from '@/lib/util/error';
import { LABELS_KEY } from '@/lib/api';

interface LabelActionsProps {
  label: Label;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LabelActions({ label, setOpen }: LabelActionsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const isMounted = useMounted();
  const router = useRouter();

  const onEdit = () => setOpen(true);

  const onDelete = async (labelId: string) => {
    setIsLoading(true);
    try {
      await LabelService.deleteLabel(labelId);

      mutate(LABELS_KEY);
      router.refresh();
      toast.success('Label removed.');
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
        onConfirm={async () => onDelete(label.id)}
        loading={isLoading}
        description="Deleting the label will result in the removal of all labels associated with a task."
      />
      <DropdownMenu modal>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icons.More className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent onSelect={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={onEdit}>
            <Icons.Pencil className="mr-2 h-3 w-3 text-muted-foreground" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => onDelete(label.id)}
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
