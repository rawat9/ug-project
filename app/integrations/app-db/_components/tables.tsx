'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSetAtom } from 'jotai'
import { selectedTableAtom } from './state'
import { type Tables } from '@/types/database'

export function Tables({ tables }: { tables: Tables<'tables'>[] }) {
  const setSelectedTable = useSetAtom(selectedTableAtom)

  if (tables) {
    setSelectedTable(tables[0]?.name ?? '')
  }

  function handleSelectTable(table: string) {
    if (!table) return
    setSelectedTable(table)
  }

  return (
    <Tabs defaultValue={tables[0]?.name} onValueChange={handleSelectTable}>
      <TabsList className="rounded-b-none bg-slate-100 py-2">
        {tables.map((table) => (
          <TabsTrigger key={table.id} value={table.name}>
            {table.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
