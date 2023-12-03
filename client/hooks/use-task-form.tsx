import * as React from 'react'

import { TaskEntry, TaskResponse } from '@/types';

import { revalidate } from '@/lib/_actions/revalidate-path';

import TaskService from '@/services/task-service';
import { handleError } from '@/util';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export const useTaskForm = (initialData?: TaskResponse) => {
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    const params = useParams();

    const [taskEntry, setTaskEntry] = React.useState<TaskEntry | undefined>(initialData);

    const deleteTask = async (taskId: string) => {  
        try {
          await TaskService.deleteTask(taskId);
          toast.success('Task deleted');
          revalidate({ path: `/lists/${params.listId}`})
        } catch (e) {
          handleError(e);
        }
      };

      const submitTask = async (data: TaskEntry) => {
        setIsLoading(true)
        try {
            if (initialData) {
                await TaskService.updateTask(initialData.id, { ...initialData, ...data});
                console.log("Editing task:", data);
                toast.success("Task saved successfully");

            } else {
                await TaskService.createTask(data);
                toast.success("Task created successfully");

                setTaskEntry({
                  name: '',
                  priority: undefined,
                  note: undefined,
                  listId: params.listId as string || undefined,
                  dueDate: undefined,
                });
            }
            revalidate({ path: `/lists/${params.listId}`})
        } catch (e) {
            console.error("Error saving task:", e);
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isOpen,
        isSaving,
        taskEntry,
        setTaskEntry,
        open, 
        close,
        submitTask,
        deleteTask,
        setIsSaving,
        isLoading
    }
}