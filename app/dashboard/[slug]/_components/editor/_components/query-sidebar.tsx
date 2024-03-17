'use client'

import { Tables } from '@/types/database'
import { Button } from '@/components/ui/button'
import { Data } from '@/icons'
import { useAtom, useSetAtom } from 'jotai'
import { activeQueryAtom, queriesAtom } from '../state'

export function QuerySidebar({
  queries,
  activeQuery,
}: {
  queries: Tables<'query'>[]
  activeQuery: Tables<'query'> | null
}) {
  const [openedQueries, setQueries] = useAtom(queriesAtom)
  const setActive = useSetAtom(activeQueryAtom)

  return (
    <div className="flex flex-col gap-3 px-2 py-4">
      <div>
        <p className="text-sm font-medium text-slate-600">
          Queries ({queries.length})
        </p>
      </div>
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
            <p className="text-sm antialiased">{query.name}</p>
          </Button>
        ))}
      </div>
    </div>
  )
}
