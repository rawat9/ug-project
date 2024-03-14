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

export function State({ onCollapse }: { onCollapse: () => void }) {
  const elements = useAtomValue(elementsAtom)

  return (
    <div className="h-full pb-1">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-md font-semibold">State</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onCollapse}
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
  )
}
