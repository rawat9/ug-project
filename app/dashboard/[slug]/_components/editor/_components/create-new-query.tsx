'use client'

import { Button } from '@/components/ui/button'
import { AddCircle } from '@/icons'
import { createQuery } from '@/lib/data/queries'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { activeQueryAtom, queriesAtom } from '../state'
import * as React from 'react'
import toast from 'react-hot-toast'

import { type Tables } from '@/types/database'
import { type PostgrestSingleResponse } from '@supabase/supabase-js'

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
        const defaultName = 'query'
        const queries = queryClient.getQueryData<
          PostgrestSingleResponse<Tables<'query'>[]>
        >(['queries'])

        let startsWithDefault = 0
        if (queries && queries.data?.length) {
          startsWithDefault = Math.max(
            ...queries.data
              .filter((query) => query.name.startsWith(defaultName))
              .map((query) => Number(query.name[query.name.length - 1])),
          )
        }

        mutation.mutate(`query${startsWithDefault + 1}`)
      }}
    >
      <AddCircle className="mr-1 h-5 w-5" />
      New query
    </Button>
  )
}
