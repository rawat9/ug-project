import { EditorPanel } from './editor-panel'
import { Provider } from 'jotai'
import { Button } from '@/components/ui/button'
import { AddCircle, Cross, Postgres, PanelBottom } from '@/icons'
import { Tab, TabGroup, TabList } from '@tremor/react'

export function Editor({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 z-50 block h-[360px] w-full border-t bg-white shadow-[0px_-2px_5px_-3px_rgba(0,0,0,0.1)]">
          <Provider>
            <div className="flex h-9 w-full items-center border-b px-2">
              <Button className="h-7 px-1" variant="ghost">
                <AddCircle className="mr-1 h-5 w-5" />
                Create new
              </Button>
              <div className="my-2 w-px bg-gray-200" />
              <TabGroup className="w-[90%] px-2" defaultIndex={0}>
                <TabList
                  variant="line"
                  className="no-scrollbar space-x-2 overflow-y-hidden overflow-x-scroll border-0"
                >
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div className="flex gap-3" key={i}>
                        <div className="my-2 w-px bg-gray-200" />
                        <Tab value="1" className="group flex items-start px-0">
                          <div className="flex w-full items-center gap-2">
                            <Postgres />
                            <p className="max-w-[90px] truncate">
                              getAllTopics
                            </p>
                            <Button variant={'ghost'} className="h-4 p-1">
                              <Cross className="h-3 w-3 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100" />
                            </Button>
                          </div>
                        </Tab>
                      </div>
                    ))}
                  </>
                  <div className="my-2 w-px bg-gray-200" />
                </TabList>
              </TabGroup>
              <Button className="ml-auto h-7 p-1" variant="ghost">
                <PanelBottom className="h-6 w-6 text-slate-500 hover:text-slate-700" />
              </Button>
            </div>
            <EditorPanel />
          </Provider>
        </div>
      )}
    </>
  )
}
