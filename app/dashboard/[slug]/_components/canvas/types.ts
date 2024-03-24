import { Column } from '@/types'
import type { TableOptions, TableState } from '@tanstack/react-table'
import type { TextProps } from '@tremor/react'

type ElementTypes =
  | 'text'
  | 'table'
  | 'area-chart'
  | 'card'
  | 'line-chart'
  | 'bar-chart'

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

interface LineChartElementProps {
  header: string
  data: unknown[]
  xAxis: string
  yAxis: string
}

interface BarChartElementProps {
  header: string
}

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

export interface LineChartElement extends BaseElement {
  type: 'line-chart'
  props: LineChartElementProps
}

export interface BarChartElement extends BaseElement {
  type: 'bar-chart'
  props: BarChartElementProps
}

export type Element =
  | TextElement
  | TableElement
  | CardElement
  | AreaChartElement
  | LineChartElement
  | BarChartElement

export interface Canvas {
  selectedElement: Element | null
  elements: Element[]
}
