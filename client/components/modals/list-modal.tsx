'use client'
import * as React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ListResponse } from '@/types'
import { Icons } from '@/components/icons'
import ListForm from '../../app/(platform)/_components/list-form'

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
      <button className="rounded-full p-1 hover:bg-accent" onClick={open}>
        {icon}
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
