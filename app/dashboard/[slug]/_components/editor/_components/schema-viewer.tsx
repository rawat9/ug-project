import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function SchemaViewer() {
  return (
    <div className="h-full overflow-y-scroll">
      <h1 className="p-3 text-sm text-gray-500">Related tables</h1>
      <div className="flex h-full flex-col space-y-2 px-4">
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>users</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between">
                <span>id</span>
                <span className="text-gray-500">integer</span>
              </div>
              <div className="flex justify-between">
                <span>note</span>
                <span className="text-gray-500">text</span>
              </div>
              <div className="flex justify-between">
                <span>analyst_email</span>
                <span className="text-gray-500">text</span>
              </div>
              <div className="flex justify-between">
                <span>user_id</span>
                <span className="text-gray-500">integer</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>posts</AccordionTrigger>
            <AccordionContent>
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
