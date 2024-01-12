import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Run } from '@/icons'
import { CodeEditor } from './code-editor'
import { SchemaViewer } from './schema-viewer'
import { Queries } from './queries'

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
            <div className="flex h-12 w-full items-center gap-2 border-b px-4">
              <h1 className="flex-1">query-name</h1>
              <Button variant={'outline'} size={'sm'} className="text-sm">
                <Run className="mr-2 h-3 w-3" />
                Run
              </Button>
            </div>

            <div className="px-4">
              <CodeEditor />
            </div>
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
