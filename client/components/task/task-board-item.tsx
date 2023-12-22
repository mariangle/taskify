'use client'

import StatusCheckbox from '@/components/task/status-checkbox'
import * as React from 'react'
import { cn } from '@/lib/util/cn'
import LabelBadge from '@/components/ui/label-badge'
import { LabelResponse, ListResponse, TaskResponse } from '@/types'
import { Icons } from '@/components/icons'

import { Button } from '@/components/ui/button'

import TaskForm from '@/components/task/task-form'

interface TaskBoardItemProps {
  task: TaskResponse
  lists: ListResponse[]
  labels: LabelResponse[]
}

const TaskBoardItem = ({ task, lists, labels }: TaskBoardItemProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <li className="list-none bg-background border rounded-md shadow-md dark:shadow-black dark:bg-neutral-900 dark:border-neutral-800">
      {!open && (
        <div className="p-3">
          <div className="flex-gap items-start">
            <StatusCheckbox task={task} />
            <div className="w-full">
              <div className="flex-between w-full">
                <span className="font-semibold text-sm" onClick={() => setOpen(true)}>
                  {task.name}
                </span>
                <Button
                  size={'icon'}
                  variant={'outline'}
                  className="w-5 h-5 rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Icons.more className="w-4 h-4 p-1" />
                </Button>
              </div>
              {task.note && (
                <p className="text-muted-foreground text-xs" onClick={() => setOpen(true)}>
                  {task?.note}
                </p>
              )}
            </div>
          </div>
          <div className="flex-gap items-center text-xs flex-wrap max-w-full">
            {task?.labels && task.labels.map((label) => <LabelBadge key={label.id} label={label} taskId={task.id} />)}
          </div>
        </div>
      )}
      {open && <TaskForm lists={lists} task={task} labels={labels} onClose={() => setOpen(false)} small />}
    </li>
  )
}
export default TaskBoardItem
