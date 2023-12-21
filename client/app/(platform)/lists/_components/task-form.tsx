'use client'

import { useTaskForm } from '@/hooks/use-task-form'
import StatusCheckbox from '../../inbox/_components/status-checkbox'
import { PriorityPicker } from './priority-picker'
import * as React from 'react'
import { cn } from '@/lib/util/cn'
import MentionsInput from '@/components/mentions-input'
import LabelBadge from '@/components/ui/label-badge'
import TaskOverlay from '@/components/modals/task-modal'

import { DatePicker } from './date-picker'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { LabelResponse, ListResponse, TaskEntry, TaskResponse } from '@/types'
import FormButton from '@/components/common/form-button'

import { useEventListener } from 'usehooks-ts'
import { useHover } from 'usehooks-ts'
import { Button } from '@/components/ui/button'
import SubtaskForm from '../../_components/subtask-form'
import { Progress } from '@/components/ui/progress'

interface TaskFormProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
  isList?: boolean
}

const TaskForm = ({ task, lists, labels, isList }: TaskFormProps) => {
  const { isOpen, open, isLoading, close, submitTask, setTaskEntry, taskEntry, deleteTask } = useTaskForm(task)
  const [hasChanges, setHasChanges] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const [showSubtaskPanel, setShowSubtaskPanel] = React.useState<boolean>(false)

  const hoverRef = React.useRef(null)
  const isHover = useHover(hoverRef)

  const handleChange = (id: keyof TaskEntry, e?: any, value?: React.SetStateAction<any>) => {
    setHasChanges(true)
    setIsEditing(true)
    if (e) {
      setTaskEntry((task) => ({ ...task, [id]: e.target.value }))
    } else if (value !== undefined) {
      setTaskEntry((task) => ({ ...task, [id]: value }))
    }
    setTimeout(() => {
      setIsEditing(false)
    }, 3000)
  }

  const down = (e: KeyboardEvent) => {
    if (hasChanges && taskEntry && e.key === 'Enter' && !(e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      submitTask(taskEntry)
      setHasChanges(false)
    }
  }

  useEventListener('keydown', down)

  const enableEditing = () => setIsEditing(true)

  React.useEffect(() => {
    setTaskEntry((prevTaskEntry) => ({
      ...prevTaskEntry,
      ...task,
    }))
  }, [task, setTaskEntry])

  React.useEffect(() => {
    if (isHover) open()
    if (!isHover && !isEditing) {
      setIsEditing(false)
      close()
    }
  }, [isHover, open, close, isEditing, hasChanges, task])

  return (
    <li className={cn('list-none', task?.status === 'Completed' && !isOpen && 'opacity-50')} ref={hoverRef}>
      <div className="flex items-center ">
        <StatusCheckbox task={task} />
        <MentionsInput
          value={taskEntry?.name || ''}
          setTaskEntry={handleChange}
          task={task}
          labels={labels}
          lists={lists}
        />
        <TaskOverlay task={task} lists={lists} labels={labels} />
      </div>
      {hasChanges && taskEntry?.name && (
        <FormButton onClick={() => submitTask(taskEntry)} disabled={isLoading} size={'sm'}>
          {task ? 'Save Changes' : 'Create'}
        </FormButton>
      )}
      {!isList && task?.subtasks && task.subtasks.length > 0 && (
        <Progress
          value={(task.subtasks.filter((subtask) => subtask.isCompleted).length / task.subtasks.length) * 100}
          className={cn('mb-2 max-w-[550px]')}
          indicatorColor={
            task.subtasks.every((subtask) => subtask.isCompleted)
              ? 'bg-emerald-500'
              : task.subtasks.some((subtask) => subtask.isCompleted)
              ? 'bg-sky-500'
              : ''
          }
        />
      )}
      <div className={'rounded-sm transition-all duration-300 overflow-hidden'}>
        <div className="flex-gap items-center text-xs">
          {task?.labels && task.labels.map((label) => <LabelBadge key={label.id} label={label} taskId={task.id} />)}
          {task && isOpen && (
            <FormButton
              onClick={() => deleteTask(task.id)}
              disabled={isLoading}
              variant={'link'}
              className="text-xs p-0 m-0 h-fit text-muted-foreground hover:text-foreground"
            >
              <Icons.trash className="w-3 h-3" />
            </FormButton>
          )}
          {(isOpen || task?.priority) && (
            <PriorityPicker
              onClick={enableEditing}
              priority={taskEntry?.priority}
              setPriority={(value) => handleChange('priority', undefined, value)}
            />
          )}
          {(isOpen || task?.dueDate) && (
            <DatePicker
              onClick={enableEditing}
              date={taskEntry?.dueDate ? new Date(taskEntry.dueDate) : undefined}
              setDate={(value) => handleChange('dueDate', undefined, value)}
            />
          )}
          {task && (isOpen || (task?.subtasks && task.subtasks.length > 0)) && (
            <Button
              variant={'ghost'}
              className="text-xs p-0 m-0 h-fit text-muted-foreground hover:text-foreground"
              onClick={() => setShowSubtaskPanel(!showSubtaskPanel)}
            >
              <Icons.subtask className="w-4 h-4 mr-1" />
              {task?.subtasks && task.subtasks.length > 0 && (
                <span>
                  {task.subtasks.filter((subtask) => subtask.isCompleted).length}/{task.subtasks.length}
                </span>
              )}
            </Button>
          )}
          {(isOpen || task?.note) && (
            <Input
              placeholder={taskEntry?.note || 'Add note'}
              value={taskEntry?.note || ''}
              onChange={(e) => handleChange('note', e)}
              onClick={open}
              className="text-xs w-fit border-none bg-transparent focus-visible:ring-0 focus-visible:ring-opacity-0 focus-visible:ring-offset-0 p-0 h-fit rounded-none"
            />
          )}
        </div>
      </div>
      {showSubtaskPanel && (
        <div className="pl-6 border-t mt-2">
          {task?.subtasks?.map((subtask) => (
            <SubtaskForm key={subtask.id} subtask={subtask} task={task} />
          ))}
          {task && <SubtaskForm task={task} />}
        </div>
      )}
    </li>
  )
}
export default TaskForm
