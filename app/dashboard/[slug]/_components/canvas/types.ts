import type { TextProps } from '@tremor/react'

type ElementTypes = 'text' | 'card' | 'area-chart'

type ElementProps = TextElementProps

interface TextElementProps extends Partial<TextProps> {
  value: string
  heading?: string
  alignment?: 'left' | 'center' | 'right'
}

export interface Element {
  id: string
  name: string
  type: ElementTypes
  x: number
  y: number
  width: number
  height: number
  props: ElementProps
}

export interface Canvas {
  selectedElement: Element | null
  elements: Element[]
}
