import { Element } from '../../types'
import { TextElement } from './text-element'
import { CardElement } from './card-element'
import { AreaChartElement } from './area-chart-element'
import { forwardRef } from 'react'

interface BaseElementProps {
  element: Element
}

const BaseElement = forwardRef<HTMLDivElement, BaseElementProps>(
  ({ element }, ref) => {
    switch (element.type) {
      case 'text':
        return <TextElement element={element} />
      case 'card':
        return <CardElement element={element} />
      case 'area-chart':
        return <AreaChartElement element={element} />
      default:
        return null
    }
  },
)

BaseElement.displayName = 'BaseElement'
export { BaseElement }
