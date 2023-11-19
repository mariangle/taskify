"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as React from "react"
import Input from "@/components/common/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { TaskResponse } from "@/types/types";
import { taskSchema, TaskSchemaType } from "@/types/schemas";
import TaskService from "@/helpers/api/task-service";
import { handleError } from "@/helpers/util/error-handler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { statuses } from "@/helpers/constants";
import { Spinner } from "@/components/ui";

interface FormProps { task: TaskResponse | null }

const TaskForm: React.FC<FormProps> = ({
    task
}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema),
        defaultValues: task ? task : undefined,
    });

    const action = task ? 'Save Changes' : 'Create'
    const message = task ? 'Changes saved!' : 'Task created!'

    const onSubmit: SubmitHandler<TaskSchemaType> = async (data: TaskSchemaType) => {
        try {
            setIsLoading(true)
            if (task){
                const updatedTask = { id: task.id, ...data}
                await TaskService.updateTask(task.id, updatedTask)
            } else {
                await TaskService.createTask(data)
            }
            router.refresh();
            router.push(`/tasks`);
            toast.success(message);
        } catch (error) {
            handleError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        if (!task) return null;
        try {
            await TaskService.deleteTask(task.id)
            router.refresh();
            router.push(`/tasks`);
            toast.success('Task deleted');
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {task && (<Button type="button" variant="flat" color="danger" onClick={onDelete}>Delete</Button>)}
        <Input id="title" register={register} errors={errors} isRequired />
        <Input id="description" register={register} errors={errors} />
        <Input id="location" register={register} errors={errors} />
        <Input id="dueDate" type="date" register={register} errors={errors} isRequired label="Due" />
        <Select
            items={statuses}
            label="Select status"
            className="max-w-xs"
            isInvalid={errors.status ? true : false}
            errorMessage={errors.status?.message}
            
            {...register('status')}
            isRequired
            // @ts-ignore
            >
            {(status) => <SelectItem key={status.value} className="dark:text-white">{status.label}</SelectItem>}
        </Select>
        <Button
            isLoading={isLoading}
            type="submit"
            color="primary"
            spinner={< Spinner />}
            onClick={handleSubmit(onSubmit)}
        >
            {action}
        </Button>
        </form>
  );
}

export default TaskForm;