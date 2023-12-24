'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Add } from '@/icons'
import { CreateForm } from './create-form'

export function CreateFormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Add />
          <p className="ml-2 hidden sm:flex">Add New</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new</DialogTitle>
          <DialogDescription>
            Add a new dashboard to your account.
          </DialogDescription>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </Dialog>
  )
}
