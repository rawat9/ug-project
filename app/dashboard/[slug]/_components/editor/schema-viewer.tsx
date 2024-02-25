import { ChevronDown } from '@/icons'
import { cn } from '@/lib/utils'
import { Disclosure } from '@headlessui/react'

export function SchemaViewer() {
  return (
    <>
      <div className="flex h-14 w-full items-center gap-2 border-b px-4">
        <h1 className="flex-1">Schema</h1>
      </div>
      <div className="h-full w-full overflow-y-scroll p-4">
        {/* <Search /> */}
        <div className="flex flex-col space-y-2">
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex text-center font-semibold">
                  users
                  <ChevronDown
                    className={cn(
                      open ? 'rotate-180 transform' : '',
                      'ml-auto',
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
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
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex text-center font-semibold">
                  posts
                  <ChevronDown
                    className={cn(
                      open ? 'rotate-180 transform' : '',
                      'ml-auto',
                    )}
                  />
                </Disclosure.Button>
                <Disclosure.Panel>
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
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </div>
    </>
  )
}
