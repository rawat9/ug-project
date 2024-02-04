import { Cross } from '@/icons'
import { useCanvasAtom } from '../canvas/state'
import { Element } from '../canvas/types'
import { TextFieldProperties } from './text-element-properties'

export function Properties() {
  const { selectedElement } = useCanvasAtom()

  if (!selectedElement) {
    return null
  }

  return (
    <div className="absolute right-0 h-full w-[350px] bg-white shadow-lg">
      <div className="flex items-center justify-between p-2">
        <h2 className="text-lg font-semibold">Properties</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <Cross className="h-5 w-5" />
        </button>
      </div>
      <div className="h-px w-full bg-gray-200" />
      <div className="border-b p-2">{selectedElement.name}</div>
      <div className="px-3 py-4">
        <BaseProperties element={selectedElement} />
      </div>
    </div>
  )
}

function BaseProperties({ element }: { element: Element }) {
  switch (element.type) {
    case 'text':
      return <TextFieldProperties selectedElement={element} />
    default:
      return null
  }
}
