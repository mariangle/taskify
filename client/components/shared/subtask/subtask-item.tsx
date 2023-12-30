import * as React from 'react'

import { SubtaskContainer } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

import SubtaskActions from '@/components/shared/subtask/subtask-actions'
import StatusCheckbox from '@/components/shared/status-checkbox'
import SubtaskForm from '@/components/shared/subtask/subtask-form'

import type { SubtaskResponse, TaskResponse } from '@/types'
import { cn } from '@/lib/util/cn'

interface SubtaskItemProps {
  subtask?: SubtaskResponse
  task: TaskResponse
}

export default function SubtaskItem({ subtask, task }: SubtaskItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  if (isOpen) {
    return (
      <SubtaskContainer className={cn('pl-2 pt-0', subtask && 'pb-2')}>
        <SubtaskForm close={close} task={task} subtask={subtask} />
      </SubtaskContainer>
    )
  }

  if (!subtask) {
    return (
      <SubtaskContainer className="pl-2">
        <Button
          variant={'ghost'}
          className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0 group/add-subtask"
          onClick={open}
        >
          <StatusCheckbox className="mr-2 border-primary bg-primary/10" />
          <span className="text-xs">Add subtask</span>
        </Button>
      </SubtaskContainer>
    )
  }

  return (
    <SubtaskContainer className="flex-between p-2">
      <div className="flex-gap">
        <StatusCheckbox subtask={subtask} />
        <span onClick={open} className="text-xs">
          {subtask.name}
        </span>
      </div>
      <div className="group-hover/subtask:opacity-100 opacity-0">
        <SubtaskActions subtask={subtask} setOpen={open} />
      </div>
    </SubtaskContainer>
  )
}
