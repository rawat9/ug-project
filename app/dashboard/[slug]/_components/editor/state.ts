import { ColumnDef } from '@tanstack/react-table'
import { atom } from 'jotai'

type Success = {
  query: string
  columns: ColumnDef<unknown, unknown>[]
  data: unknown[]
  error: null
  executionTime: number
}

type Failure = {
  query: string
  data: unknown[]
  error:
    | Error
    | {
        name: string
        message: string
        position: string
      }
  executionTime: number
}

export const queryResultAtom = atom((get) => {
  const { data, error, executionTime } = get(editorAtom)

  if (error) return { data, error, executionTime }

  if (data.length === 0) return null

  const first = data[0] as { [key: string]: unknown }
  const columns = Object.keys(first).map((key) => ({
    accessorKey: key,
    header: key,
  })) as ColumnDef<unknown, unknown>[]

  return { columns, data, executionTime }
})

export const editorAtom = atom<Success | Failure>({
  query: '',
  columns: [],
  data: [],
  error: null,
  executionTime: 0,
})

export const showQueryResultAtom = atom(false)
