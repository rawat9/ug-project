import { atom } from 'jotai'
import { dataTypes } from './data-types'

export type Column = {
  name: string
  type: (typeof dataTypes)[number]['name'] | ''
  default: string
  options: {
    primary: boolean
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
        primary: false,
        nullable: false,
        unique: false,
      },
    },
  ],
})
