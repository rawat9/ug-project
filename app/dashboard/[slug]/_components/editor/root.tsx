import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import CodeEditor from './code-editor'
import { SchemaViewer } from './schema-viewer'
import { Queries } from './queries'
import { Result } from './result'
import { Provider } from 'jotai'

function Editor() {
  return (
    <div className="h-full w-full rounded-lg bg-slate-100">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} order={1}>
          <div className="flex h-full w-full justify-center rounded-lg bg-white">
            <Queries />
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-slate-100 p-1" />

        <ResizablePanel order={2} defaultSize={60}>
          <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-white">
            <ResizablePanelGroup direction="vertical">
              <Provider>
                <ResizablePanel minSize={20} defaultSize={100} order={1}>
                  <CodeEditor />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={0} order={2}>
                  <div className="flex h-8 w-full items-center gap-2 border-b px-4">
                    <h1 className="text-sm font-semibold text-slate-600">
                      Result
                    </h1>
                  </div>
                  <Result />
                </ResizablePanel>
              </Provider>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-slate-100 p-1" />

        <ResizablePanel minSize={20} defaultSize={20} order={3}>
          <div className="flex h-full w-full justify-center rounded-lg bg-white">
            <SchemaViewer />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default Editor
