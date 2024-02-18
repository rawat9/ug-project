import type { TextProps } from '@tremor/react'

type ElementTypes = 'text' | 'card' | 'area-chart' | 'table'

interface TextElementProps extends Partial<TextProps> {
  value: string
  heading?: string
  alignment: {
    justify: 'start' | 'end' | 'center'
    items: 'start' | 'end' | 'center'
  }
}

interface TableElementProps {
  name: string
}

export type BaseElement = {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  type: string
}

export type TextElement = BaseElement & {
  type: 'text'
  props: TextElementProps
}

export type TableElement = BaseElement & {
  type: 'table'
  props: TableElementProps
}

export type AreaChartElement = BaseElement & {
  type: 'area-chart'
  props: {}
}

export type CardElement = BaseElement & {
  type: 'card'
  props: {}
}

export type Element =
  | TextElement
  | TableElement
  | AreaChartElement
  | CardElement

export interface Canvas {
  selectedElement: BaseElement | Element | null
  elements: Element[]
}
