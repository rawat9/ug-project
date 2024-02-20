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
        value: 'Dummy text',
        alignment: {
          justify: 'start',
          items: 'center',
        },
      }
    case 'card':
      return {}
    case 'area-chart':
      return {}
    case 'table':
      return {
        tableHeader: '',
        data: [],
        enablePagination: true,
        pageSize: 10,
        enableSearch: false,
        enableSorting: true,
      }
    default:
      throw new Error(`Invalid type: ${type}`)
  }
}
