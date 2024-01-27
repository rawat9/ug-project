import { atom } from 'jotai'
import type { Table } from './types'

export const createTableAtom = atom<Table>({
  name: '',
  description: '',
  columns: [],
})
