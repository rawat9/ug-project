import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Queries } from './queries'
import { EditorPanel } from './editor-panel'
import { Provider } from 'jotai'

export function Editor({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      {isOpen && (
        <ResizablePanel
          id="editor"
          defaultSize={40}
          minSize={30}
          className="z-90 hidden items-center justify-center shadow-2xl sm:flex"
          order={2}
          collapsible
        >
          <Provider>
            <div className="h-full w-full rounded-lg bg-white">
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                  minSize={20}
                  defaultSize={20}
                  maxSize={30}
                  order={1}
                >
                  <div className="flex h-full w-full flex-col">
                    <Queries />
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel order={2} defaultSize={80}>
                  <EditorPanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Provider>
        </ResizablePanel>
      )}
    </>
  )
}
