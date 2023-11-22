"use client"

import React from "react";
import { Input, Select, Button } from "@/components/shared";
import { 
  Select as ListSelect, 
  SelectItem,
} from "@nextui-org/react"
import { ListResponse, TaskEntry, TaskResponse } from "@/types";
import { taskSchema, TaskSchemaType } from "@/types/schemas";
import TaskService from "@/helpers/services/task-service";
import AlertModal from "@/components/modals/alert-modal";
import { handleError } from "@/helpers/util/error";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { priorities, statuses } from "@/helpers/constants";
import { formatStringToYYYYMMDD } from "@/helpers/util/format";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps { 
  task: TaskResponse | null,
  lists: ListResponse[] | [],
  isModal: boolean,
}

const TaskForm: React.FC<FormProps> = ({
    task,
    lists,
    isModal
}) => {
    const action = task ? 'Save Changes' : 'Create Task'
    const message = task ? 'Changes saved!' : 'Task created!'

    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const [isOpen, setIsOpen] = React.useState<boolean>(false); 

    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const listId = searchParams.get('listId')
    // Determine the default value by checking if there's a task property; otherwise, look at search params; otherwise, use the default value
    const taskStatus = task?.status ? [task.status] : status ? [status] : ['Incomplete'];
    const taskPriority = task?.priority ? [task.priority] : priority ? [priority] : [];
    const taskList = task?.listId ? [task.listId]  : listId ? [listId] : [];

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors }
      } = useForm<TaskSchemaType>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
          ...task,
          dueDate: formatStringToYYYYMMDD(task?.dueDate),
        },
      });

      const onSubmit = async (data: TaskSchemaType) => {
        try {
          setIsLoading(true);

          const newTask: TaskEntry = {
            ...data,
            listId: data.listId || null,
            dueDate: data.dueDate || null,
            priority: data.priority || null,
          };

            task
            ? await TaskService.updateTask(task.id, newTask)
            : await TaskService.createTask(newTask);
          router.refresh();
          isModal ? router.back(): router.push(`/tasks`);
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
          isModal ? router.back(): router.push(`/tasks`);
          toast.success('Task deleted');
        } catch (error) {
          console.error(error);
        }
      };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AlertModal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
          onConfirm={onDelete}
          loading={isLoading}
        />
        <Input id="name" register={register} errors={errors} isRequired />
        <Input id="dueDate" type="date" register={register} errors={errors} label="Due Date" />
        <Select id='status' items={statuses} defaultSelectedKeys={taskStatus} register={register} errors={errors} isRequired>
        </Select>
        <Select id='priority' items={priorities} defaultSelectedKeys={taskPriority} register={register} errors={errors}>
        </Select>
        <ListSelect
          className="max-w-xs"
          label='Select List'
          isInvalid={errors.listId ? true : false}
          errorMessage={errors.listId?.message}
          defaultSelectedKeys={taskList}
          {...(register && register('listId'))}
        >
            {lists.map((list) => (
              <SelectItem key={list.id} value={list.id} className="dark:text-white">
                {list.name}
              </SelectItem>
            ))}  
        </ListSelect>
        <div className="flex-gap">
          <Button
              isLoading={isLoading}
              disabled={task === getValues()}
              type="submit"
              variant="shadow"
              className="block"
              onClick={handleSubmit(onSubmit)}
          >
              {action}
          </Button>
          {task && <Button type="button" variant="flat" color="danger" onClick={() => setIsOpen(true)}>Delete</Button>}          
        </div>

      </form>
  );
}

export default TaskForm;