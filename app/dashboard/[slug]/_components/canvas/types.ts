import type { TextProps } from '@tremor/react'

type ElementType = 'text'

type ElementProps<T extends ElementType> = T extends 'text'
  ? TextElementProps
  : never

interface TextElementProps extends Partial<TextProps> {
  value: string
  heading?: string
  alignment?: 'left' | 'center' | 'right'
}

// TODO: pass a default without compromising the type
export interface Element {
  id: string
  name: string
  type: 'text'
  x: number
  y: number
  width: number
  height: number
  props: ElementProps<'text'>
}

export interface Canvas {
  selectedElement: Element | null
  elements: Element[]
}
