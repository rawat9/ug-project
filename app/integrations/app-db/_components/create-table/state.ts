import { atom } from 'jotai'
import type { Table } from './types'

type DataImportAtom = {
  name: string
  description: string
  columns: Table['columns']
  data: Record<string, unknown>[]
}

export const dataImportAtom = atom<DataImportAtom>({
  name: '',
  description: '',
  columns: [],
  data: [],
})
