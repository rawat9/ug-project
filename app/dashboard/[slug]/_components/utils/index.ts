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
    case 'card':
      return {}
    case 'area-chart':
      return {}
    case 'table':
      return {
        tableHeader: '',
        dataSource: '',
        data: [],
        columns: [],
        enablePagination: true,
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
        color: 'blue',
      }
    default:
      throw new Error(`Invalid type: ${type}`)
  }
}
