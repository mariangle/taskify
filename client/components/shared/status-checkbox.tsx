import * as React from 'react';

import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import type { Subtask, Task } from '@/types';

import { Checkbox } from '@/components/ui/checkbox';
import { handleError } from '@/lib/util';

import { TaskService } from '@/services/task-service';
import { SubtaskService } from '@/services/subtask-service';

interface StatusCheckboxProps {
  task?: Task;
  subtask?: Subtask;
  className?: string;
  disabled?: boolean;
}

export default function StatusCheckbox({
  task,
  subtask,
  className,
  disabled,
}: StatusCheckboxProps) {
  const [isCompleted, setIsCompleted] = React.useState(
    task?.isComplete || subtask?.isComplete || false,
  );
  const router = useRouter();

  React.useEffect(() => {
    setIsCompleted(task?.isComplete || subtask?.isComplete || false);
  }, [task, subtask]);

  if (!task && !subtask)
    return <Checkbox className={className} disabled={disabled} />;

  const onToggleStatus = async () => {
    try {
      const updatedStatus = !isCompleted;

      if (task && !subtask) {
        // Ensure a complete task with subtasks doesn't have completed subtasks
        /*
        const hasCompletedSubtasks =
          task.subtasks &&
          task.subtasks.length > 0 &&
          task.subtasks.every((subtask) => subtask.isCompleted);

        if (isCompleted && hasCompletedSubtasks) {
          throw new Error(
            'To mark this task as incomplete, uncheck a subtask.',
          );
        }

        // Ensure an incomplete task with incomplete tasks doesn't get marked as done
        const hasIncompleteSubtasks = task.subtasks?.some(
          (subtask) => !subtask.isCompleted,
        );

        if (!isCompleted && hasIncompleteSubtasks) {
          throw new Error('You have unfinished subtasks.');
        }
        */

        await TaskService.updateTask(task.id, {
          ...task,
          isComplete: !!updatedStatus,
        });
      } else if (subtask && task) {
        await SubtaskService.updateSubtask(task.id, subtask.id, {
          ...subtask,
          isComplete: updatedStatus,
        });
      }

      if (!isCompleted) {
        toast.success(task ? 'Task completed!' : 'Subtask completed!');
      }

      setIsCompleted(updatedStatus);
      router.refresh();
    } catch (error) {
      handleError(error);
    }
  };

  const priorityClassnames: { [key: string]: string } = {
    LOW: 'border-sky-500 bg-sky-500/10',
    MEDIUM: 'border-yellow-500 bg-yellow-500/10',
    HIGH: 'border-red-500 bg-red-500/10',
  };

  return (
    <Checkbox
      checked={isCompleted}
      onCheckedChange={onToggleStatus}
      className={priorityClassnames[task?.priority || '']}
    />
  );
}
