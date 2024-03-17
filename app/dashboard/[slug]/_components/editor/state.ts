import { Tables } from '@/types/database'
import { atom } from 'jotai'
import { atomFamily } from 'jotai/utils'

interface PostgresError {
  name: string
  message: string
  position: string
  hint?: string
}

type Editor = {
  query: string
  columns: string[]
  data: unknown[]
  error: PostgresError | null
  executionTime: number
}

export const editorAtom = atom<Editor>({
  query: '',
  columns: [],
  data: [],
  error: null,
  executionTime: 0,
})

export const queryAtom = atomFamily((queryName: string) =>
  atom(null, (_, set, newValue: string) => {
    const key = `__query-${queryName}`
    if (newValue.trim() === localStorage.getItem(key)?.trim()) {
      return
    }
    localStorage.setItem(key, newValue)
    set(activeQueryAtom, (prev) => {
      if (prev) {
        return { ...prev, sql_query: newValue }
      }
      return prev
    })
    set(queriesAtom, (prev) => {
      return prev.map((query) => {
        if (query.name === queryName) {
          return { ...query, sql_query: newValue }
        }
        return query
      })
    })
  }),
)

export const activeQueryAtom = atom<Tables<'query'> | null>(null)

export const queriesAtom = atom<Tables<'query'>[]>([])
