import * as React from 'react'

import { SubtaskContainer } from '@/components/ui/container'

import SubtaskActions from '@/components/shared/subtask/subtask-actions'
import StatusCheckbox from '@/components/shared/status-checkbox'
import SubtaskForm from '@/components/shared/subtask/subtask-form'

import type { SubtaskResponse, TaskResponse } from '@/types'

interface SubtaskItemProps {
  subtask?: SubtaskResponse
  task: TaskResponse
  setShowAddSubtask?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SubtaskItem({ subtask, task, setShowAddSubtask = () => {} }: SubtaskItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const close = () => setIsOpen(false)
  const open = () => setIsOpen(true)

  if (isOpen) {
    return (
      <SubtaskContainer>
        <SubtaskForm close={close} task={task} subtask={subtask} />
      </SubtaskContainer>
    )
  }

  if (!subtask) {
    return (
      <SubtaskContainer>
        <SubtaskForm close={close} closeNewSubtask={() => setShowAddSubtask(false)} task={task} />
      </SubtaskContainer>
    )
  }

  return (
    <SubtaskContainer className="flex-between">
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
