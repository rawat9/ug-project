import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { SchemaViewer } from './schema-viewer'
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
                <ResizablePanel minSize={20} defaultSize={20} order={1}>
                  <div className="flex h-full w-full flex-col">
                    <Queries />
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel order={2} defaultSize={60}>
                  <div className="flex h-full w-full flex-col">
                    <EditorPanel />
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel minSize={20} defaultSize={20} order={3}>
                  <SchemaViewer />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </Provider>
        </ResizablePanel>
      )}
    </>
  )
}
