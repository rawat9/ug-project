import { atom } from 'jotai'

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

export const queryAtom = atom('')
