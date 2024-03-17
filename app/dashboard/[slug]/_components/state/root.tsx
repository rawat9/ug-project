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

export function State({ isOpen }: { isOpen: boolean }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()
  const elements = useAtomValue(elementsAtom)

  const handleCollapse = () => {
    params.delete('state')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
          className="absolute left-2 top-2 z-50 block h-[550px] w-[300px] rounded-md bg-white shadow-md"
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
                    <div className="flex justify-between">
                      <span>id</span>
                      <span className="text-gray-500">integer</span>
                    </div>
                    <div className="flex justify-between">
                      <span>age</span>
                      <span className="text-gray-500">text</span>
                    </div>
                    <div className="flex justify-between">
                      <span>name</span>
                      <span className="text-gray-500">text</span>
                    </div>
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
