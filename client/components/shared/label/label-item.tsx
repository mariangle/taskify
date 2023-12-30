'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { ListContainer, BoardContainer } from '@/components/ui/container'

import LabelForm from '@/components/shared/settings/label-form'
import LabelBadge from '@/components/ui/label-badge'
import LabelActions from '@/components/shared/label/label-actions'

import type { LabelResponse } from '@/types'

interface LabelItemProps {
  label?: LabelResponse
}

export default function LabelItem({ label }: LabelItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  if (isOpen) {
    return (
      <BoardContainer className="p-4">
        <LabelForm close={close} label={label} />
      </BoardContainer>
    )
  }

  if (!label) {
    return (
      <Button
        variant={'ghost'}
        className="justify-start group hover:bg-transparent text-muted-foreground hover:text-foreground px-0"
        onClick={open}
      >
        <div className="group-hover:bg-primary bg-transparent rounded-full p-1 mr-2">
          <Icons.add className="h-3 w-3 text-primary group-hover:text-white" />
        </div>
        <span>Add label</span>
      </Button>
    )
  }

  return (
    <ListContainer>
      <div className="flex-between">
        <div onClick={open}>
          <LabelBadge label={label} noBorder />
        </div>
        <div className="opacity-0 group-hover:opacity-100">
          <LabelActions label={label} setOpen={open} />
        </div>
      </div>
    </ListContainer>
  )
}
