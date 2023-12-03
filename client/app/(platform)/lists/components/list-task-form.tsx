"use client"

import { useTaskForm } from '@/hooks/use-task-form';
import TaskCheckbox from '../../tasks/components/task-checkbox';
import { PriorityPicker } from './priority-picker';
import * as React from 'react'

import { DatePicker } from './date-picker';
import { Input } from '@/components/ui/input';
import { ListResponse, TaskEntry, TaskResponse } from '@/types';
import FormButton from '@/components/common/form-button';

interface FormProps { 
  task?: TaskResponse
  list?: ListResponse
}

const ListTaskForm = ({
  task,
  list,
} : FormProps) => {
    const { isOpen, open, isLoading, close, submitTask, setTaskEntry, taskEntry, deleteTask } = useTaskForm(task);
    const [ isEdited, setIsEdited ] = React.useState<boolean>(false) 

    const handleChange = (
      id: keyof TaskEntry,
      e?: React.ChangeEvent<HTMLInputElement>,
      value?: React.SetStateAction<any>,
    ) => {
      setIsEdited(true);
      if (e) {
        setTaskEntry((task) => ({ ...task, [id]: e.target.value }));
      } else if (value !== undefined) {
        setTaskEntry((task) => ({ ...task, [id]: value }));
      }
    };

    React.useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (isEdited && taskEntry && e.key === "Enter" && !(e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          submitTask(taskEntry)
          setIsEdited(false)
        }
      };
    
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, [close, taskEntry, isEdited, submitTask]);

  return (
    <div className='border p-2 rounded-sm'> 
      <div className="flex items-center">
        <TaskCheckbox task={task} />
        <Input
          placeholder={ task ? task.name : 'Create task...'}
          transparent
          value={taskEntry?.name || ''}
          onChange={(e) => handleChange('name', e)}
          onClick={open}
        />
        { task && (
          <FormButton onClick={() => deleteTask(task.id)} disabled={isLoading}>
            Delete
          </FormButton>
        )}
        { taskEntry && (
                 <FormButton onClick={() => submitTask(taskEntry)} disabled={isLoading}>
                 {task ? 'update' : 'create'}
               </FormButton>
        )}
      </div>
      <div 
          className={'rounded-sm transition-all duration-300 overflow-hidden'}
        >
          <div className='flex items-center text-xs'>          
            {(isOpen || task?.priority) && (
              <PriorityPicker
                priority={taskEntry?.priority}
                setPriority={(value) => handleChange('priority', undefined, value)}
              />
            )}     
            {(isOpen || task?.dueDate) && (
              <DatePicker 
                 // @ts-ignore
                date={taskEntry?.dueDate || undefined}   
                setDate={(value) => handleChange('dueDate', undefined, value)} 
              />
            )} 
            {(isOpen || task?.note) && (
              <Input
                placeholder={taskEntry?.note || 'Add note'}
                value={taskEntry?.note || ''}
                onChange={(e) => handleChange('note', e)}              
                onClick={open}
                className="text-xs w-fit border-none bg-transparent focus-visible:ring-0 focus-visible:ring-opacity-0 focus-visible:ring-offset-0"
              />
            )} 
          </div>
          {JSON.stringify(taskEntry)}
        </div>
    </div>
  )
}
export default ListTaskForm