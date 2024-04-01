import { Element } from '../../types'

import { TextElement } from './text-element'
import { CardElement } from './card-element'
import { AreaChartElement } from './area-chart-element'
import { TableElement } from './table-element'
import { LineChartElement } from './line-chart-element'
import { BarChartElement } from './bar-chart-element'
import { BarListElement } from './bar-list-element'

export function BaseElement({ element }: { element: Element }) {
  switch (element.type) {
    case 'text':
      return <TextElement element={element} />
    case 'card':
      return <CardElement element={element} />
    case 'area-chart':
      return <AreaChartElement element={element} />
    case 'table':
      return <TableElement element={element} />
    case 'line-chart':
      return <LineChartElement element={element} />
    case 'bar-chart':
      return <BarChartElement element={element} />
    case 'bar-list':
      return <BarListElement element={element} />
    default:
      throw new Error(`Unknown element type: ${element}`)
  }
}
