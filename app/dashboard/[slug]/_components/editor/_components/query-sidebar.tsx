'use client'

import { Tables } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Data } from '@/icons'
import { useAtom, useSetAtom } from 'jotai'
import { activeQueryAtom, queriesAtom } from '../state'
import { fetchQueries } from '@/lib/data/client/queries'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export function QuerySidebar({
  activeQuery,
}: {
  activeQuery: Tables<'query'> | null
}) {
  const [openedQueries, setQueries] = useAtom(queriesAtom)
  const setActive = useSetAtom(activeQueryAtom)
  const queryClient = useQueryClient()

  const { data: queries } = useQuery({
    queryKey: ['queries'],
    queryFn: fetchQueries,
    select: (it) => it.data,
    retry: 3,
    retryDelay: 2000,
  })

  const handleRefresh = () => {
    return queryClient.invalidateQueries({ queryKey: ['queries'] })
  }

  return (
    <>
      {!queries?.length ? (
        <div className="flex h-full w-full justify-center p-4">
          <div className="flex h-[80%] w-[90%] flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed">
            <p className="text-sm text-gray-500">
              You don&apos;t have any queries
            </p>
            <button
              className="text-xs underline underline-offset-4"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col gap-3 overflow-y-auto px-2 py-4 pb-20">
          <p className="text-sm font-medium text-slate-600">
            Queries ({queries.length})
          </p>
          <div className="space-y-1">
            {queries.map((query) => (
              <Button
                key={query.id}
                variant={activeQuery?.id === query.id ? 'secondary' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  if (openedQueries.some((it) => it.id === query.id)) {
                    return setActive(query)
                  }

                  setQueries((prev) => [...prev, query])
                  setActive(query)
                }}
              >
                <Data className="mr-2 h-4 w-4" />
                <p className="truncate text-sm antialiased">{query.name}</p>
              </Button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
