import { Element } from '../../types'
import { TextElement } from './text-element'

export function BaseElement({ element }: { element: Element }) {
  switch (element.type) {
    case 'text':
      return <TextElement element={element} />
    default:
      return null
  }
}
