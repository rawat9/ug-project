'use client'

import { Cross, Data } from '@/icons'
import { TabGroup, Tab, TabList } from '@tremor/react'
import { useAtom } from 'jotai'
import { activeQueryAtom, queriesAtom, queryAtom } from '../state'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQuery } from '@/lib/data/queries'

export function Queries() {
  const [active, setActive] = useAtom(activeQueryAtom)
  const [queries, setQueries] = useAtom(queriesAtom)

  const queryClient = useQueryClient()

  const updateMutation = useMutation({
    mutationFn: updateQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['queries'] }),
  })

  const handleSaveQuery = () => {
    if (!active || !active.sql_query) {
      return
    }

    queryAtom.remove(active.name)
    updateMutation.mutate({
      id: active.id,
      key: 'sql_query',
      value: active.sql_query,
    })
  }

  return (
    <TabGroup
      index={active ? queries.findIndex((it) => it.id === active.id) : 0}
    >
      <TabList
        variant="line"
        className="no-scrollbar space-x-0 overflow-y-hidden overflow-x-scroll scroll-smooth border-b-0"
      >
        {queries.map((query) => (
          <div
            key={query.id}
            className="flex select-none border-l first:border-l-0 last:border-r"
          >
            <Tab
              icon={Data}
              value={query.id}
              onClick={() => setActive(query)}
              className="group hover:shadow-inner ui-selected:border-slate-600 ui-selected:text-slate-800"
            >
              <div className="flex gap-1">
                <p>{query.name}</p>
                <Cross
                  className="h-5 w-5 p-1 text-slate-700 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100"
                  onClick={(e) => {
                    e.preventDefault()
                    setQueries((prev) =>
                      prev.filter((it) => it.id !== query.id),
                    )
                    const activeIndex = queries.findIndex(
                      (query) => query.id === active?.id,
                    )
                    if (active?.id === query.id) {
                      if (queries.length - 1 === activeIndex) {
                        setActive(queries[activeIndex - 1] ?? null)
                      } else {
                        setActive(queries[activeIndex + 1] ?? null)
                      }
                    }
                    // save the query
                    handleSaveQuery()
                  }}
                />
              </div>
            </Tab>
          </div>
        ))}
      </TabList>
    </TabGroup>
  )
}
