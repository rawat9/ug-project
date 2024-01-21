import { atom } from 'jotai'

type Column = {
  name: string
  type: string
  default: string
}

type Table = {
  tableName: string
  columns: Column[]
}

export const createTableAtom = atom<Table>({
  tableName: '',
  columns: [
    {
      name: '',
      type: '',
      default: '',
    },
  ],
})
