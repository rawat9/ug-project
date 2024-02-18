import { atom, useAtom } from 'jotai'
import { BaseElement, Canvas, Element, TextElement } from './types'

const canvasAtom = atom<Canvas>({
  selectedElement: null,
  elements: [],
})

export const elementsAtom = atom(
  (get) => get(canvasAtom).elements,
  (_get, set, update: Element[]) => {
    set(canvasAtom, (prev) => ({ ...prev, elements: update }))
  },
)

export const useCanvasAtom = () => {
  const [state, setState] = useAtom(canvasAtom)

  return {
    ...state,
    setSelectedElement: (element: BaseElement | Element | null) => {
      setState((prev) => ({ ...prev, selectedElement: element }))
    },
    addElement: (element: BaseElement) => {
      // @ts-ignore
      element.props = defaultValues[element.type]
      setState((prev) => ({
        ...prev,
        elements: [...prev.elements, element as Element],
      }))
    },
    removeElement: (id: string) => {
      setState((prev) => ({
        ...prev,
        elements: prev.elements.filter((el) => el.id !== id),
      }))
    },
    updateElement: (id: string, element: Element) => {
      setState((prev) => {
        const newElements = [...prev.elements]
        const index = newElements.findIndex((el) => el.id === id)
        newElements[index] = element
        return { ...prev, elements: newElements }
      })
    },
  }
}

// TODO: Write a type for defaultValues
type StartsWith<T extends string, U extends string> = T extends `${U}${string}`
  ? T
  : never

// type DefaultValues = {
//   [P in Element['type']]: { }
// }

const defaultValues = {
  text: {
    value: 'Dummy text',
    heading: '',
    alignment: 'left',
  },
  table: {
    name: 'Table name',
  },
  'area-chart': {},
  card: {},
}
