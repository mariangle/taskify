"use client"

import * as React from "react"
import { Input, Select, Button } from "@/components/common";
import { TaskResponse } from "@/types";
import { taskSchema, TaskSchemaType } from "@/types/schemas";
import TaskService from "@/helpers/services/task-service";
import { handleError } from "@/helpers/util/error-handler";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { statuses } from "@/helpers/constants";
import { formatStringToYYYYMMDD } from "@/helpers/util/formatter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps { task: TaskResponse | null }

const TaskForm: React.FC<FormProps> = ({
    task,
}) => {
    const action = task ? 'Save Changes' : 'Create'
    const message = task ? 'Changes saved!' : 'Task created!'

    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get('status')
    const taskStatus = task?.status ? [task.status] : status ? [status] : ['Todo'];

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
          ...task,
          description: '',
          dueDate: formatStringToYYYYMMDD(task?.dueDate) || '',
        },
      });

      const onSubmit = async (data: TaskSchemaType) => {
        try {
          setIsLoading(true);
    
          const newTask = task
            ? { id: task.id, ...data }
            : data;

            task
            ? await TaskService.updateTask(task.id, newTask)
            : await TaskService.createTask(newTask);
            
          router.refresh();
          router.push(`/tasks`);
          toast.success(message);
        } catch (error) {
          handleError(error);
        } finally {
          setIsLoading(false);
        }
      };

      const onDelete = async () => {
        if (!task) return;
    
        try {
          await TaskService.deleteTask(task.id);
          router.refresh();
          router.push(`/tasks`);
          toast.success('Task deleted');
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {task && (
            <Button type="button" variant="flat" color="danger" onClick={onDelete}>Delete</Button>
        )}
        <Input id="title" register={register} errors={errors} isRequired />
        <Input id="description" register={register} errors={errors} />
        <Input id="location" register={register} errors={errors} />
        <Input id="dueDate" type="date" register={register} errors={errors} isRequired label="Due" />
        <Select id='status' items={statuses} defaultSelectedKeys={taskStatus} register={register} errors={errors} isRequired>
        </Select>
        <Button
            isLoading={isLoading}
            type="submit"
            onClick={handleSubmit(onSubmit)}
        >
            {action}
        </Button>
    </form>
  );
}

export default TaskForm;