import type { Table } from './types'
import { atomWithReset } from 'jotai/utils'

type DataImportAtom = {
  name: string
  description: string
  columns: Table['columns']
  data: Record<string, unknown>[]
}

export const dataImportAtom = atomWithReset<DataImportAtom>({
  name: '',
  description: '',
  columns: [],
  data: [],
})
