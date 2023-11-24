"use client"

import {
  Form,
} from "@/components/ui/form"
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import FormSelectList from "@/components/common/form-select.list";
import FormDatePicker from "@/components/common/form-date-picker";

import * as React from "react"
import { Button } from "@/components/ui/button";
import { ListResponse, TaskEntry, TaskResponse } from "@/types";
import { taskSchema, TaskSchemaType } from "@/types/schemas";
import TaskService from "@/helpers/services/task-service";
import AlertModal from "@/components/modals/alert-modal";
import { handleError } from "@/helpers/util/error";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { priorities, statuses } from "@/helpers/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormProps { 
  task: TaskResponse | null,
  lists: ListResponse[] | [],
  onClose: () => void,
}

const TaskForm: React.FC<FormProps> = ({
    task,
    lists,
    onClose
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
    const taskStatus = task?.status ? task.status: status ? status : 'Incomplete';
    const taskPriority = task?.priority ? task.priority : priority ? priority : undefined;
    const taskList = task?.listId ? task.listId  : listId ? listId : undefined;

    const form = useForm<TaskSchemaType>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        ...task,
        status: taskStatus,
        name: task?.name || '',
        listId: taskList,
        priority: taskPriority,
        dueDate: task?.dueDate || '',
      }})

      const onSubmit = async (data: TaskSchemaType) => {
        try {
          setIsLoading(true);

          const newTask: TaskEntry = {
            ...data,
            dueDate: data.dueDate ? data.dueDate : null
          };

            task
            ? await TaskService.updateTask(task.id, { ...newTask, id: task.id })
            : await TaskService.createTask(newTask);
          router.refresh();
          onClose();
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
          onClose();
          toast.success('Task deleted');
        } catch (error) {
          handleError(error);
          setIsOpen(false);
        }
      };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <AlertModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            onConfirm={onDelete}
            loading={isLoading}
          />
          <FormInput form={form} name="name"/>    
          <FormDatePicker form={form} name="dueDate" placeholder="Select A date"/>
          <FormSelect items={statuses} form={form} name="status"/>       
          <FormSelect items={priorities} form={form} name="priority"/>    
          <FormSelectList items={lists} form={form} name="listId" label="List" placeholder="Select a list"/>          
          <div className="flex-gap justify-end">
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                {action}
            </Button>
            {task && <Button type="button" variant={'destructive'} onClick={() => setIsOpen(true)}>Delete</Button>}          
          </div>
        </form>
      </Form>
  );
}

export default TaskForm;