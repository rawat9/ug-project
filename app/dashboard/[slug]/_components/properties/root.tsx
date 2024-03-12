import { Cross, Selection } from '@/icons'
import { useCanvasAtom } from '../canvas/state'
import { Element } from '../canvas/types'
import { TextElementProperties } from './_components/text-element-properties'

export function Properties() {
  const { selectedElement } = useCanvasAtom()

  return (
    <div className="h-full">
      <div className="flex h-[5%] items-center justify-between p-2">
        <h2 className="text-md font-semibold">Properties</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <Cross className="h-5 w-5" />
        </button>
      </div>
      <div className="h-px w-full bg-gray-200" />
      {selectedElement ? (
        <>
          <div className="border-b p-2">{selectedElement.name}</div>
          <div className="py-4">
            <BaseProperties element={selectedElement} />
          </div>
        </>
      ) : (
        <div className="flex h-[95%] flex-col items-center justify-center p-2 text-gray-400">
          <Selection className="my-4 h-12 w-12" />
          Select an element to edit its properties
        </div>
      )}
    </div>
  )
}

function BaseProperties({ element }: { element: Element }) {
  switch (element.type) {
    case 'text':
      return <TextElementProperties selectedElement={element} />
    default:
      return null
  }
}
