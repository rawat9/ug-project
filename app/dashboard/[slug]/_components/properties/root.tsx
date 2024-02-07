import { Cross } from '@/icons'
import { useCanvasAtom } from '../canvas/state'
import { Element } from '../canvas/types'
import { TextElementProperties } from './_components/text-element-properties'
import { AnimatePresence, motion } from 'framer-motion'

export function Properties() {
  const { selectedElement, setSelectedElement } = useCanvasAtom()

  if (!selectedElement) {
    return null
  }

  return (
    <AnimatePresence>
      {selectedElement && (
        <motion.div
          className="absolute right-0 h-full w-[350px] bg-white shadow-lg"
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
        >
          <div className="flex items-center justify-between p-2">
            <h2 className="text-lg font-semibold">Properties</h2>
            <button
              onClick={() => setSelectedElement(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <Cross className="h-5 w-5" />
            </button>
          </div>
          <div className="h-px w-full bg-gray-200" />
          <div className="border-b p-2">{selectedElement.name}</div>
          <div className="px-3 py-4">
            <BaseProperties element={selectedElement} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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
