import { Column } from '@/types'
import type {
  OnChangeFn,
  SortingState,
  TableOptions,
  TableState,
  VisibilityState,
} from '@tanstack/react-table'
import type { TextProps } from '@tremor/react'

type ElementTypes = 'text' | 'table' | 'area-chart' | 'card'

interface TextElementProps extends Partial<TextProps> {
  value: string
  heading?: string
  alignment: {
    justify: 'start' | 'end' | 'center'
    items: 'start' | 'end' | 'center'
  }
}

interface TableElementProps {
  tableHeader: string
  dataSource: string
  enablePagination: boolean
  pageSize: number
  enableSorting: boolean
  data: unknown[]
  columns: Column[]
  state: Partial<TableState>
  options: TableOptions<unknown>
}

interface CardElementProps {}

interface AreaChartElementProps {}

export interface BaseElement {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  minHeight: number
}

export interface TableElement extends BaseElement {
  type: 'table'
  props: TableElementProps
}

export interface TextElement extends BaseElement {
  type: 'text'
  props: TextElementProps
}

export interface CardElement extends BaseElement {
  type: 'card'
  props: CardElementProps
}

export interface AreaChartElement extends BaseElement {
  type: 'area-chart'
  props: AreaChartElementProps
}

export type Element =
  | TextElement
  | TableElement
  | CardElement
  | AreaChartElement

export interface Canvas {
  selectedElement: Element | null
  elements: Element[]
}
