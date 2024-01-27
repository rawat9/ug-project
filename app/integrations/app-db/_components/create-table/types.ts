import { dataTypes } from './data-types'

type ColumnOptions = {
  primary: boolean
  nullable: boolean
  unique: boolean
}

type Column = {
  name: string
  type: (typeof dataTypes)[number]['name'] | ''
  default: string
  options: ColumnOptions
}

export type Table = {
  name: string
  description: string
  columns: Column[]
}
