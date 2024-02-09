import { atom, useAtom } from 'jotai'
import { Canvas, Element } from './types'

const canvasAtom = atom<Canvas>({
  selectedElement: null,
  elements: [],
})

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
        return { ...prev, elements: newElements }
      })
    },
  }
}
