"use client"

import { useTaskForm } from '@/hooks/use-task-form';
import { Checkbox } from '@/components/ui/checkbox';
import { PriorityPicker } from './priority-picker';
import TaskCheckbox from "../../tasks/components/task-checkbox";
import { isOverdue } from "@/util/format";
import useClickOutside from "@/hooks/use-click-outside";

import * as React from 'react'

import TaskService from '@/services/task-service';
import { DatePicker } from './date-picker';
import { Input } from '@/components/ui/input';
import { ListResponse, TaskEntry, TaskResponse } from '@/types';

interface FormProps { 
  task?: TaskResponse
  list?: ListResponse
}

const ListTaskForm = ({
  task,
  list,
} : FormProps) => {
    const { isOpen, toggle } = useTaskForm();
    const existingLabels = task?.labels || []
    const formRef = React.useRef(null);

    const [taskEntry, setTaskEntry] = React.useState<TaskEntry>({
      name: task?.name || '',
      priority: task?.priority || undefined,
      labels: existingLabels,
      listId: list?.id || undefined,
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
    });

    const submit = async () => {
      try {
        task 
        ? console.log("hey") 
        : await TaskService.createTask(taskEntry)
      } catch (e){
        alert(e)
      }
    }

    useClickOutside(formRef, toggle);

  return (
    <div className='border p-2'> 
      {!isOpen ? (
        task ? (
          <>
              <TaskCheckbox task={task} />
              <span className={isOverdue({ date: task.dueDate, status: task.status}) ? "text-destructive" : ""} onClick={toggle} >{task.name}</span>
          </>
        ) : (
          <div onClick={toggle}>
              <Checkbox />
              <span className='text-muted-foreground'>Create new Task</span>          
            </div>          
        )
      ) : (
        <div className='border' ref={formRef}>
          <div className='flex-gap'>
            <Checkbox disabled/>
            <Input
              value={taskEntry.name || ''}
              onChange={(e) => setTaskEntry((task) => ({ ...task, name: e.target.value }))}
              className="w-full border-none bg-transparent focus:ring-0"
            />            
          </div>
          <div className='flex-gap'>          
            <div>add note</div>
            <PriorityPicker priority={taskEntry.priority} setPriority={(newPriority) => setTaskEntry((task) => ({ ...task, priority: newPriority }))}/>
            { /* @ts-ignore */}
            <DatePicker date={taskEntry.dueDate} setDate={(newDate) => setTaskEntry((task) => ({ ...task, dueDate: newDate }))} />
          </div>
          <div className='flex-gap'>
            <div onClick={toggle}>
              close
            </div>
            <div onClick={submit}>
              submit
            </div>
          </div>
        </div>
      )
    }
    </div>
  )
}
export default ListTaskForm