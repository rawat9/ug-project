import type { Element } from '../canvas/types'

/**
 * Get the props for the element type
 * @param type The element type
 * @returns The default props for the element type
 */
export function getElementProps(type: Element['type']): Element['props'] {
  switch (type) {
    case 'text':
      return {
        type: 'plaintext',
        rawValue: 'Text',
        displayValue: 'Text',
        alignment: {
          justify: 'start',
          items: 'center',
        },
        color: 'gray',
        fontSize: 16,
      }
    case 'table':
      return {
        title: '',
        dataKey: '',
        data: [],
        columns: [],
        enablePagination: true,
        enableGrouping: true,
        pageSize: 10,
        enableSorting: true,
        aggregatedValues: [],
      }
    case 'line-chart':
      return {
        data: [],
        columns: [],
        categories: [],
        groupedCategories: [],
        curveType: 'linear',
      }
    case 'bar-chart':
      return {
        data: [],
        columns: [],
        categories: [],
        groupedCategories: [],
      }
    case 'bar-list':
      return {
        data: [],
        columns: [],
        color: 'blue',
      }
    default:
      throw new Error(`Invalid type: ${type}`)
  }
}
