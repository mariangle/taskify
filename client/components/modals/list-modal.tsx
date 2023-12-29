'use client'
import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Icons } from '@/components/shared/icons'

import type { ListResponse } from '@/types'
import ListForm from '@/components/shared/list/list-form'
import { cn } from '@/lib/util/cn'
import { buttonVariants } from '@/components/ui/button'

interface ModalProps {
  list?: ListResponse
}

export default function ListModal({ list }: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const icon = list ? <Icons.more className="w-3 h-3" /> : <Icons.add className="w-3 h-3" />
  const dialogRef = React.useRef(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), 'w-5 h-5 rounded-full')}>
            <Icons.more className="w-5 h-5 p-1" />
          </div>
        </DialogTrigger>
        <DialogContent ref={dialogRef} className="p-6">
          <DialogHeader>
            <DialogTitle>{list ? `Edit ${list.name}` : 'Create list'}</DialogTitle>
            <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
          </DialogHeader>
          <ListForm list={list} onClose={close} />
        </DialogContent>
      </Dialog>
    </>
  )
}
