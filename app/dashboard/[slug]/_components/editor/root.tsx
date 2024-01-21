import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import CodeEditor from './code-editor'
import { SchemaViewer } from './schema-viewer'
import { Queries } from './queries'
import { Provider } from 'jotai'
import { Result } from './result'

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
            <Provider>
              <ResizablePanelGroup
                autoSaveId="editor-center"
                direction="vertical"
              >
                <ResizablePanel
                  id="code-editor"
                  minSize={20}
                  defaultSize={100}
                  order={1}
                >
                  <CodeEditor />
                </ResizablePanel>
                <ResizableHandle />
                <Result />
              </ResizablePanelGroup>
            </Provider>
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
