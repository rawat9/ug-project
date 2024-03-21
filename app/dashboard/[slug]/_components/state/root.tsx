'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Cross } from '@/icons'
import JsonView from '@uiw/react-json-view'
import { TriangleArrow } from '@uiw/react-json-view/triangle-arrow'
import { useAtomValue } from 'jotai'
import { elementsAtom } from '../canvas/state'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { editorAtom } from '../editor/state'

export function State({ isOpen }: { isOpen: boolean }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()
  const elements = useAtomValue(elementsAtom)
  const queries = useAtomValue(editorAtom)

  const handleCollapse = () => {
    params.delete('state')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className="absolute left-4 top-4 z-50 block h-[550px] w-[300px] rounded-md bg-white shadow-md"
        >
          <div className="h-full pb-1">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-md font-semibold">State</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCollapse}
              >
                <Cross className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[90%] overflow-y-auto font-mono">
              <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
                <AccordionItem value="item-1" className="p-4">
                  <AccordionTrigger className="uppercase text-gray-500">
                    Widgets
                  </AccordionTrigger>
                  <AccordionContent className="py-2">
                    {elements.map((el) => (
                      <JsonView
                        key={el.id}
                        value={el}
                        collapsed={true}
                        keyName={el.name}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        style={{ fontSize: '0.845rem', fontFamily: 'inherit' }}
                      >
                        <JsonView.Arrow>
                          <TriangleArrow />
                        </JsonView.Arrow>
                      </JsonView>
                    ))}
                  </AccordionContent>
                </AccordionItem>
                <div className="h-px w-full bg-gray-200" />
                <AccordionItem value="item-2" className="p-4">
                  <AccordionTrigger className="uppercase text-gray-500">
                    Queries
                  </AccordionTrigger>
                  <AccordionContent className="py-2">
                    <JsonView
                      key={'1'}
                      value={queries}
                      collapsed={true}
                      keyName={'query1'}
                      displayDataTypes={false}
                      displayObjectSize={false}
                      style={{ fontSize: '0.845rem', fontFamily: 'inherit' }}
                    >
                      <JsonView.Arrow>
                        <TriangleArrow />
                      </JsonView.Arrow>
                    </JsonView>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
