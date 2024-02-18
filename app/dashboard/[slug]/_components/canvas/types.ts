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
}

interface CardElementProps {}

interface AreaChartElementProps {}

type BaseElement = {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
}

export type TableElement = BaseElement & {
  type: 'table'
  props: TableElementProps
}

export type TextElement = BaseElement & {
  type: 'text'
  props: TextElementProps
}

export type CardElement = BaseElement & {
  type: 'card'
  props: CardElementProps
}

export type AreaChartElement = BaseElement & {
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
