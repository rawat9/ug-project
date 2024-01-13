import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Run } from '@/icons'
import CodeEditor from './code-editor'
import { SchemaViewer } from './schema-viewer'
import { Queries } from './queries'
import { Sources } from './_components/sources'

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
            <div className="flex h-14 w-full items-center gap-2 border-b px-4">
              <h1 className="flex-1">query-name</h1>
              <Sources />
              <Button variant={'outline'} className="text-sm">
                <Run className="mr-2 h-3 w-3" />
                Run
              </Button>
            </div>

            <ResizablePanelGroup direction="vertical">
              <ResizablePanel minSize={20} defaultSize={100} order={1}>
                <CodeEditor />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={0} order={2}>
                <div>Results</div>
              </ResizablePanel>
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
