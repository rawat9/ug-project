import { EditorPanel } from './editor-panel'
import { Provider } from 'jotai'
import { Button } from '@/components/ui/button'
import { AddCircle, Cross, Postgres, PanelBottom } from '@/icons'
import { Tab, TabGroup, TabList } from '@tremor/react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function Editor({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 z-50 block h-[360px] w-full border-t bg-white shadow-[0px_-2px_5px_-3px_rgba(0,0,0,0.1)]">
          <Provider>
            <div className="flex h-9 w-full items-center border-b px-2">
              <div className="flex w-[85%] items-center">
                <Button className="h-7 px-1" variant="ghost">
                  <AddCircle className="mr-1 h-5 w-5" />
                  Create new
                </Button>
                <TabGroup className="px-2" defaultIndex={0}>
                  <TabList
                    variant="line"
                    className="no-scrollbar space-x-0 overflow-y-hidden overflow-x-scroll scroll-smooth border-b-0 border-l"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex select-none border-l first:border-l-0 last:border-r"
                      >
                        <Tab
                          value="idOfTheQuery"
                          icon={Postgres}
                          className="group hover:shadow-inner ui-selected:border-slate-600 ui-selected:text-slate-800"
                        >
                          <div className="flex gap-1">
                            <p>getAllTopics</p>
                            <Cross
                              className="h-5 w-5 p-1 text-slate-700 opacity-0 group-hover:opacity-100 group-aria-selected:opacity-100"
                              onClick={() => {
                                console.log('delete')
                              }}
                            />
                          </div>
                        </Tab>
                      </div>
                    ))}
                  </TabList>
                </TabGroup>
              </div>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="ml-auto p-1">
                      <PanelBottom className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Toggle editor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <EditorPanel />
          </Provider>
        </div>
      )}
    </>
  )
}
