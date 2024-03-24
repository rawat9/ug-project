import { atom, useAtom } from 'jotai'
import type { Canvas, Element } from './types'

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
    setSelectedElement: (element: Element | null) => {
      setState((prev) => ({ ...prev, selectedElement: element }))
    },
    addElement: (element: Element) => {
      setState((prev) => ({
        ...prev,
        elements: [...prev.elements, element],
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
        return { ...prev, elements: newElements, selectedElement: element }
      })
    },
  }
}
