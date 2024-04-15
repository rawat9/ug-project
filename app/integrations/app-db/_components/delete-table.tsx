'use client'

import { Delete } from '@/icons'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { type Tables } from '@/types/database'
import { useAtomValue } from 'jotai'
import { selectedTableAtom } from './state'
import { useUser } from '@clerk/nextjs'
import { executeQuery } from '@/lib/data/server/queries'
import { deleteTable } from '@/lib/data/server/demo'
import toast from 'react-hot-toast'

export function DeleteTable({ tables }: { tables: Tables<'tables'>[] }) {
  const selectedTable = useAtomValue(selectedTableAtom)
  const { user } = useUser()

  if (!selectedTable) {
    return null
  }

  const table = tables.find((table) => table.name === selectedTable)

  if (user?.id !== table?.user_id) {
    return null
  }

  const handleDeleteTable = async () => {
    if (!table) return
    toast.promise(executeQuery(`DROP TABLE ${table.name};`, null, true), {
      loading: 'Deleting table...',
      success: 'Table deleted',
      error: 'Failed to delete table',
    })
    await deleteTable(table?.name)
  }

  return (
    <Button
      variant="outline"
      className="mr-2 h-6 bg-white"
      size="sm"
      onClick={handleDeleteTable}
    >
      <Delete className="mr-1 h-3 w-3" />
      Delete table
    </Button>
  )
}
