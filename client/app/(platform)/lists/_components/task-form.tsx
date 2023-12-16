'use client'

import { useTaskForm } from '@/hooks/use-task-form'
import TaskCheckbox from '../../tasks/_components/task-checkbox'
import { PriorityPicker } from './priority-picker'
import * as React from 'react'
import MentionsInput from '@/components/mentions-input'
import LabelBadge from '@/components/ui/label-badge'

import { DatePicker } from './date-picker'
import { Input } from '@/components/ui/input'
import { Icons } from '@/components/icons'
import { LabelResponse, ListResponse, TaskEntry, TaskResponse } from '@/types'
import FormButton from '@/components/common/form-button'
import SubtaskPanel from './subtask-panel'

import { useEventListener } from 'usehooks-ts'
import { useHover } from 'usehooks-ts'
import { useDebounce } from 'usehooks-ts'

interface TaskFormProps {
  task?: TaskResponse
  lists?: ListResponse[]
  labels?: LabelResponse[]
}

const TaskForm = ({ task, lists, labels }: TaskFormProps) => {
  const { isOpen, open, isLoading, close, submitTask, setTaskEntry, taskEntry, deleteTask, params } = useTaskForm(task)
  const [hasChanges, setHasChanges] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const [showSubtaskPanel, setShowSubtaskPanel] = React.useState<boolean>(true)

  const hoverRef = React.useRef(null)
  const isHover = useHover(hoverRef)
  const debouncedEntry = useDebounce(taskEntry, 2000)

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
    }, 2000)
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
    if (isHover && task?.status !== 'Completed') open()
    if (!isHover && !isEditing) {
      setIsEditing(false)
      close()
    }
  }, [isHover, open, close, isEditing, hasChanges, task])

  return (
    <li className="border-b list-none py-1" ref={hoverRef}>
      <div className="flex items-center max-w-md">
        <TaskCheckbox task={task} />
        <MentionsInput
          value={taskEntry?.name || ''}
          setTaskEntry={handleChange}
          task={task}
          labels={labels}
          lists={lists}
        />
      </div>
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
        {task && task?.subtasks && <SubtaskPanel subtasks={task.subtasks} />}
      </div>
      {hasChanges && taskEntry?.name && (
        <FormButton onClick={() => submitTask(taskEntry)} disabled={isLoading} size={'sm'}>
          {task ? 'Save Changes' : 'Create'}
        </FormButton>
      )}
    </li>
  )
}
export default TaskForm
