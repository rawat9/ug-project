import { atom } from 'jotai'

type Column = {
  name: string
  type: string
  default: string
  options: {
    nullable: boolean
    unique: boolean
  }
}

type Table = {
  name: string
  columns: Column[]
}

export const createTableAtom = atom<Table>({
  name: '',
  columns: [
    {
      name: '',
      type: '',
      default: '',
      options: {
        nullable: false,
        unique: false,
      },
    },
  ],
})
