'use client'

import * as React from 'react'

import { BoardContainer, ListContainer } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/shared/icons'

import StatusCheckbox from '@/components/shared/task/status-checkbox'
import LabelBadge from '@/components/ui/label-badge'
import TaskForm from '@/components/shared/task/task-form'
import TaskOptionsDropdown from './task-options-dropdown'

import { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { formatDistance } from 'date-fns'

interface TaskItemProps {
  task?: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
  type?: 'list' | 'board'
  date?: string
}

const TaskItem = ({ task, lists, type = 'list', labels, date }: TaskItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

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
    <TaskContainer className="p-2 group">
      <div className="flex-gap items-start">
        <StatusCheckbox task={task} />
        <div className="w-full">
          <div className="flex-between w-full">
            <span className="font-semibold text-sm" onClick={open}>
              {task.name}
            </span>
            <div className="opacity-0 group-hover:opacity-100">
              <TaskOptionsDropdown task={task} setOpen={setIsOpen} />
            </div>
          </div>
          {task.note && (
            <p className="text-muted-foreground text-xs" onClick={open}>
              {task?.note}
            </p>
          )}
          <div className="flex-gap items-center text-xs flex-wrap max-w-full">
            {task?.dueDate && (
              <span className="flex-gap-sm">
                <Icons.calendar className="w-3 h-3" />
                {formatDistance(new Date(task.dueDate), new Date(), { addSuffix: true })}
              </span>
            )}
            <div className="flex-gap items-center text-xs flex-wrap max-w-full">
              {task?.labels && task.labels.map((label) => <LabelBadge key={label.id} label={label} taskId={task.id} />)}
            </div>
          </div>
        </div>
      </div>
    </TaskContainer>
  )
}

export default TaskItem
