import type { Column } from '@/types'
import type {
  AggregationFn,
  TableOptions,
  TableState,
} from '@tanstack/react-table'
import type {
  BarChartProps,
  BarListProps,
  EventProps,
  LineChartProps,
  TextProps,
} from '@tremor/react'

type ElementTypes =
  | 'text'
  | 'table'
  | 'area-chart'
  | 'card'
  | 'line-chart'
  | 'bar-chart'

interface TextElementProps {
  type: 'plaintext' | 'markdown'
  rawValue: string
  displayValue: string
  color: string
  alignment: {
    justify: 'start' | 'end' | 'center'
    items: 'start' | 'end' | 'center'
  }
  fontSize: number
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
  aggregatedValues: { column: Column; aggFn: AggregationFn<any> }[]
}

interface CardElementProps {}

interface AreaChartElementProps {}

interface BarListElementProps extends BarListProps {
  dataKey: string
  name: string
  value: string
}

interface LineChartElementProps extends Omit<LineChartProps, 'categories'> {
  title: string
  originalData: unknown[]
  xAxisTitle: string
  yAxisTitle: string
  columns: Column[]
  categories: { name: string; aggFn: 'sum' | 'count' | 'mean' }[]
  dataKey: string
  groupBy: string
  groupedCategories: string[]
  indexTimeGranularity: 'Daily' | 'Monthly' | 'Yearly'
}

interface BarChartElementProps extends Omit<BarChartProps, 'categories'> {
  title: string
  originalData: unknown[]
  dataKey: string
  xAxisTitle: string
  yAxisTitle: string
  columns: Column[]
  groupBy: string
  groupedCategories: string[]
  categories: { name: string; aggFn: 'sum' | 'count' | 'mean' }[]
  yAggregation: string
  selected: EventProps
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

export interface BarListElement extends BaseElement {
  type: 'bar-list'
  props: BarListElementProps
}

export type Element =
  | TextElement
  | TableElement
  | CardElement
  | AreaChartElement
  | LineChartElement
  | BarChartElement
  | BarListElement

export interface Canvas {
  selectedElement: Element | null
  elements: Element[]
}
