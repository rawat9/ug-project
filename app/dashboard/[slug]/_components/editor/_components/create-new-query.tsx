'use client'

import { Button } from '@/components/ui/button'
import { AddCircle } from '@/icons'
import { createQuery } from '@/lib/data/queries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue, useSetAtom } from 'jotai'
import { activeQueryAtom, queriesAtom } from '../state'
import toast from 'react-hot-toast'

export function CreateNewQuery() {
  const setQueries = useSetAtom(queriesAtom)
  const setActiveQuery = useSetAtom(activeQueryAtom)
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createQuery,
    onSuccess: ({ data }) => {
      if (!data) return

      setQueries((prev) => [...prev, data])
      setActiveQuery(data)
      return queryClient.invalidateQueries({ queryKey: ['queries'] })
    },
    onError: () => {
      return toast.error('Error creating query')
    },
  })

  return (
    <Button
      className="h-7 px-1"
      variant="ghost"
      onClick={() => {
        mutation.mutate({ name: 'Untitled' })
      }}
    >
      <AddCircle className="mr-1 h-5 w-5" />
      New query
    </Button>
  )
}
