"use client"

import {
  Form,
} from "@/components/ui/form"
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import FormSelectList from "@/components/common/form-select.list";
import FormDatePicker from "@/components/common/form-date-picker";
import { PriorityPicker } from "../lists/_components/priority-picker";

import * as React from "react"
import { Button } from "@/components/ui/button";
import { LabelResponse, ListResponse, TaskEntry, TaskResponse } from "@/types";
import { TaskSchema, TaskSchemaType } from "@/lib/validations/task";
import TaskService from "@/services/task-service";
import AlertModal from "@/components/modals/alert-modal";
import { handleError } from "@/util/error";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { priorities, statuses } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperimentalMultiSelect } from "@/components/common/experimental-multi-select";
import { useTaskForm } from "@/hooks/use-task-form";

// TODO: Change styling https://ui.shadcn.com/docs/components/combobox

interface FormProps { 
  task: TaskResponse | null,
  lists: ListResponse[] | [],
  labels: LabelResponse[] | [],
  onClose?: () => void,
}

const TaskForm: React.FC<FormProps> = ({
    task,
    lists,
    labels,
    onClose,
}) => {
    const action = task ? 'Save Changes' : 'Create Task'
    const message = task ? 'Changes saved!' : 'Task created!'
    const existingLabels = task?.labels || []


    const [isLoading, setIsLoading] = React.useState<boolean>(false); 
    const [isOpen, setIsOpen] = React.useState<boolean>(false); 
    const [selectedLabels, setSelectedLabels] = React.useState<LabelResponse[]>(existingLabels);
    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false); 

    const { deleteTask } = useTaskForm()
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
      resolver: zodResolver(TaskSchema),
      defaultValues: {
        ...task,
        status: taskStatus,
        name: task?.name || '',
        listId: taskList,
        priority: taskPriority,
        dueDate: task?.dueDate || '',
        labelIds: taskLabels || [],
        projectId: task?.projectId || ''
      }})

      const onSubmit = async (data: TaskSchemaType) => {
        const labelIds = selectedLabels.map(label => label.id);
        try {
            setIsLoading(true);
    
            const newTask: TaskEntry = {
                ...data,
                dueDate: data.dueDate || null,
                labelIds: labelIds || undefined
          };
  
          if (task) {
              await TaskService.updateTask(task.id, { ...newTask, id: task.id });
  
              const currentLabels = existingLabels.map(label => label.id);
              const labelsToAdd = labelIds.filter(labelId => !currentLabels.includes(labelId));
              const labelsToRemove = currentLabels.filter(labelId => !labelIds.includes(labelId));
  
              for (const labelId of labelsToAdd) await TaskService.addLabel({ taskId: task.id, labelId });
              for (const labelId of labelsToRemove) await TaskService.removeLabel({ taskId: task.id, labelId });
          } else {
              const createdTask = await TaskService.createTask(newTask);
  
              if (labelIds?.length) {
                  for (const labelId of labelIds) await TaskService.addLabel({ taskId: createdTask.id, labelId });
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
        await deleteTask(task.id)
        onClose && onClose();
      };

      React.useEffect(() => {
        form.watch()
        const labelIds = selectedLabels.map(label => label.id);
        form.setValue("labelIds", labelIds);
      }, [form, selectedLabels]);

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AlertModal 
            isOpen={isOpen} 
            onClose={closeDialog}
            onConfirm={onDelete}
            loading={isLoading}
          />
          <FormInput form={form} name="name"/> 
          <div className="flex-gap mt-4">
              <FormDatePicker form={form} name="dueDate" placeholder="Select Date"/>
              <FormSelectList items={lists} form={form} name="listId" label="List" placeholder="None"/>  
              { /* <FormSelectList items={projects} form={form} name="projectId" label="Project" placeholder="None"/>  */}
          </div>   
          <ExperimentalMultiSelect 
                label="Labels" 
                items={labels}
                selectedItems={selectedLabels}
                onSelectedItemsChange={setSelectedLabels}
                placeholder="Apply label.."
              />
          <div className="flex-gap w-full">
            { task && <FormSelect items={statuses} form={form} name="status"/>}
            <FormSelect items={priorities} form={form} name="priority"/>    
          </div>
          <div className="flex-gap justify-between mt-4">
            <div>
              {task && <Button type="button" variant={'secondary'} onClick={openDialog}>Delete</Button>}     
            </div>
            <div className="flex-gap">
              <Button type="button" variant={'ghost'} onClick={onClose}>Cancel</Button>   
              <Button type="submit">
                {action}
              </Button>    
            </div> 
          </div>
        </form>
      </Form>
  );
}

export default TaskForm;