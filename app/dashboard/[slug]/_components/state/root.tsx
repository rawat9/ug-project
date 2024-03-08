import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Cross } from '@/icons'
import JsonView from '@uiw/react-json-view'
import { TriangleArrow } from '@uiw/react-json-view/triangle-arrow'
import { TriangleSolidArrow } from '@uiw/react-json-view/triangle-solid-arrow'

export function State() {
  const example = {
    string: 'Lorem ipsum dolor sit amet',
    undefined,
    date: new Date('Tue Sep 13 2022 14:07:44 GMT-0500 (Central Daylight Time)'),
    array: [19, 100.86, 'test', NaN, Infinity],
    nestedArray: [
      [1, 2],
      [3, 4],
    ],
    object: {
      'first-child': true,
      'second-child': false,
      'last-child': null,
    },
    string_number: '1234',
  }

  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-md font-semibold">State</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <Cross className="h-5 w-5" />
        </button>
      </div>
      {/* <div className="h-px w-full bg-gray-200" /> */}
      <div className="h-[90%] overflow-y-auto font-mono">
        <Accordion type="multiple">
          <AccordionItem value="item-1" className="p-4">
            <AccordionTrigger className="uppercase text-gray-500">
              Widgets
            </AccordionTrigger>
            <AccordionContent className="py-2">
              <JsonView
                value={example}
                keyName={'root'}
                displayDataTypes={false}
                displayObjectSize={false}
                style={{ fontSize: '0.845rem', fontFamily: 'inherit' }}
              >
                <JsonView.Arrow>
                  <TriangleSolidArrow />
                </JsonView.Arrow>
              </JsonView>
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
