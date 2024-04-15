'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/icons'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className="col-span-1 mt-2 justify-self-end"
      disabled={pending}
    >
      {pending && (
        <Spinner className="mr-2 h-3 w-3 animate-spin duration-500" />
      )}
      Save changes
    </Button>
  )
}
