'use client'

import * as React from 'react'

import { BoardContainer, ListContainer } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'

import StatusCheckbox from '@/components/shared/status-checkbox'
import LabelBadge from '@/components/ui/label-badge'
import TaskForm from '@/components/shared/task/task-form'
import SubtaskList from '@/components/shared/subtask/subtask-list'
import TaskActions from '@/components/shared/task/task-actions'
import { DatePicker } from './date-picker'

import type { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { cn } from '@/lib/util/cn'

interface TaskItemProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
  type?: 'list' | 'board'
  date?: string
}

const TaskItem = ({ task, lists, type = 'list', labels, date }: TaskItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [openSubtasks, setOpenSubtasks] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const TaskContainer = type === 'list' ? ListContainer : BoardContainer

  if (isOpen) {
    return (
      <BoardContainer>
        <TaskForm lists={lists} task={task} labels={labels} close={close} small initialValues={{ dueDate: date }} />
      </BoardContainer>
    )
  }

  if (!task) {
    return (
      <Button
        variant={'ghost'}
        className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0"
        onClick={open}
      >
        <div className="group-hover:bg-primary bg-transparent rounded-full p-1 mr-2">
          <Icons.add className="h-3 w-3 text-primary group-hover:text-white" />
        </div>
        <span>Add task</span>
      </Button>
    )
  }

  return (
    <TaskContainer className="pb-2 pt-3 px-3 group group/task">
      <div className="flex-gap items-start">
        {/* Toggle task status */}
        <div className="pt-1">
          <StatusCheckbox task={task} />
        </div>
        <div className="w-full">
          <div className="flex-between w-full">
            {/* Task Name */}
            <span className="font-semibold text-sm" onClick={open}>
              {task.name}
            </span>
            {/* Task Actions Dropdown */}
            <div className="opacity-0 group-hover:opacity-100">
              <TaskActions
                task={task}
                labels={labels}
                lists={lists}
                setOpen={open}
                openSubtasks={() => setOpenSubtasks(!openSubtasks)}
              />
            </div>
          </div>
          {task.note && (
            <p className="text-muted-foreground text-xs" onClick={open}>
              {task?.note}
            </p>
          )}
          {/* List of properties a task has */}
          <div className="flex-gap items-center flex-wrap w-full">
            {/* Due date */}
            <DatePicker variant={{ type: 'item', task }} defaultValue={task.dueDate} />
            {/* Labels */}
            {task?.labels && (
              <div className="flex-gap items-center flex-wrap max-w-full">
                {task.labels.map((label) => (
                  <LabelBadge key={label.id} label={label} taskId={task.id} />
                ))}
              </div>
            )}

            {/* Subtasks */}
            {task.subtasks && task.subtasks.length > 0 && (
              <Button
                variant={'picker'}
                size="icon"
                className={cn('w-fit px-1')}
                onClick={() => setOpenSubtasks(!openSubtasks)}
              >
                <Icons.subtask className="h-3 w-3 mr-1" />
                <span className="text-xs">
                  {task.subtasks.filter((subtask) => subtask.isCompleted).length}/{task.subtasks.length}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* Subtasks shouldnt be shown in lists by default */}
      {(type !== 'list' || openSubtasks) && (
        <SubtaskList task={task} subtasks={task.subtasks} showSubtaskList={openSubtasks} />
      )}
    </TaskContainer>
  )
}

export default TaskItem
