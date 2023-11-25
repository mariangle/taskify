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
import { LabelResponse, ListResponse, TaskEntry, TaskResponse } from "@/types";
import { taskSchema, TaskSchemaType } from "@/types/schemas";
import TaskService from "@/helpers/services/task-service";
import TaskLabelService from "@/helpers/services/task-label-service";
import AlertModal from "@/components/modals/alert-modal";
import { handleError } from "@/helpers/util/error";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { priorities, statuses } from "@/helpers/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperimentalMultiSelect } from "@/components/common/experimental-multi-select";

interface FormProps { 
  task: TaskResponse | null,
  lists: ListResponse[] | [],
  labels: LabelResponse[] | [],
  onClose?: () => void,
}

const TaskForm: React.FC<FormProps> = ({
    task,
    lists,
    onClose,
    labels,
}) => {
    const action = task ? 'Save Changes' : 'Create Task'
    const message = task ? 'Changes saved!' : 'Task created!'
    const existingLabels = task?.labels || []

    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const [isOpen, setIsOpen] = React.useState<boolean>(false); 
    const [selectedLabels, setSelectedLabels] = React.useState<LabelResponse[]>(existingLabels);

    const router = useRouter();
    const searchParams = useSearchParams();
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const listId = searchParams.get('listId')
    // Determine the default value by checking if there's a task property; otherwise, look at search params; otherwise, use the default value
    const taskStatus = task?.status ? task.status: status ? status : 'Incomplete';
    const taskPriority = task?.priority ? task.priority : priority ? priority : undefined;
    const taskList = task?.listId ? task.listId  : listId ? listId : undefined;
    const taskLabels: string[] = [];

    const form = useForm<TaskSchemaType>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        ...task,
        status: taskStatus,
        name: task?.name || '',
        listId: taskList,
        priority: taskPriority,
        dueDate: task?.dueDate || '',
        labelIds: taskLabels || [],
      }})

      const onSubmit = async (data: TaskSchemaType) => {
        const labelIds = selectedLabels.map(label => label.id);
        try {
          setIsLoading(true);

          const newTask: TaskEntry = {
            ...data,
            dueDate: data.dueDate ? data.dueDate : null,
            labelIds: labelIds || undefined
          };
          
          if (task) {
            // Update the task
            await TaskService.updateTask(task.id, { ...newTask, id: task.id });
            // Associate the task with labels
            if (labelIds && labelIds.length > 0) {
              for (const labelId of labelIds) {
                console.log("associating")
                await TaskLabelService.associateTaskLabel({ taskId: task.id, labelId });
              }
            }
          } else {
            // Create a new task
            const createdTask = await TaskService.createTask(newTask);
            // !! No ID??
            // Associate the task with labels
            if (labelIds && labelIds.length > 0) {
              for (const labelId of labelIds) {
                console.log("associating")
                await TaskLabelService.associateTaskLabel({ taskId: createdTask.id, labelId });
              }
            }
          }

          router.refresh();
          onClose && onClose();
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
          onClose && onClose();
          toast.success('Task deleted');
        } catch (error) {
          handleError(error);
          setIsOpen(false);
        }
      };

      React.useEffect(() => {
        form.watch()
        const labelIds = selectedLabels.map(label => label.id);
        form.setValue("labelIds", labelIds);
      }, [form, selectedLabels]);

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <AlertModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)}
            onConfirm={onDelete}
            loading={isLoading}
          />
          <FormInput form={form} name="name"/> 
          <div className="flex-gap">
              <FormDatePicker form={form} name="dueDate" placeholder="Select Date"/>
              <FormSelectList items={lists} form={form} name="listId" label="List" placeholder="None"/>  
          </div>   
          <ExperimentalMultiSelect 
                label="Labels" 
                items={labels}
                selectedItems={selectedLabels}
                onSelectedItemsChange={setSelectedLabels}
                placeholder=""
              />
          <div className="flex-gap w-full">
            { task && <FormSelect items={statuses} form={form} name="status"/>       }
            <FormSelect items={priorities} form={form} name="priority"/>    
          </div>
          <div className="flex-gap justify-end z-10">
            <Button type="submit" onClick={() => console.log("SUBMIT")}>
                {action}
            </Button>
            <button type="button" onClick={() => console.log(form.getValues)}>test</button>
            {task && <Button type="button" variant={'destructive'} onClick={() => setIsOpen(true)}>Delete</Button>}          
          </div>
          {JSON.stringify(form.getValues())}
        </form>
      </Form>
  );
}

export default TaskForm;