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
  data: unknown[]
  enablePagination: boolean
  pageSize: number
  enableSearch: boolean
  enableSorting: boolean
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
