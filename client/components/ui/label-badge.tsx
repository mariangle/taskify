'use client'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { LabelResponse } from '@/types'
import { Icons } from '@/components/shared/icons'
import { revalidate } from '@/lib/_actions/revalidate-path'

import TaskService from '@/services/task-service'
import { handleError } from '@/lib/util'
import { usePathname } from 'next/navigation'

interface LabelBadgeProps {
  label: LabelResponse
  noBorder?: boolean
  taskId?: string
}

export default function LabelBadge({ label, noBorder, taskId }: LabelBadgeProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const path = usePathname()

  if (noBorder)
    return (
      <div className="flex-gap">
        <div className="h-2 w-2 rounded-full border" style={{ backgroundColor: label.color }} />
        {label.name}
      </div>
    )

  const onRemove = async (taskId: string) => {
    setIsLoading(true)
    try {
      await TaskService.removeLabel({ taskId: taskId, labelId: label.id })
      revalidate({ path: path, type: 'page' })
    } catch (e) {
      handleError(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Badge key={label.id} variant={'outline'} className="flex-gap">
      <div className="h-2 w-2 rounded-full border" style={{ backgroundColor: label.color }} />
      {label.name}
      {taskId && !isLoading && (
        <Icons.close className="w-2 h-2 hover:cursor-pointer" onClick={() => onRemove(taskId)} />
      )}
    </Badge>
  )
}
