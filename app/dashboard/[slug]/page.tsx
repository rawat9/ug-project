import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Widgets } from './_components/widgets'
import { Editor } from './_components/editor'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor?: string
    widgets?: string
  }
}) {
  return (
    <ResizablePanelGroup
      direction="vertical"
      autoSaveId="persistance"
      className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)] bg-slate-100"
    >
      <ResizablePanel id="canvas+editor" order={1} defaultSize={60}>
        <ResizablePanelGroup direction="horizontal">
          {searchParams?.widgets === 'true' && (
            <>
              <ResizablePanel
                id="widgets"
                order={1}
                className="mr-[-0.5rem] flex items-center justify-center p-2"
                maxSize={20}
                minSize={10}
              >
                <Widgets />
              </ResizablePanel>
              <ResizableHandle className="hover:bg-slate-500" />
            </>
          )}
          <ResizablePanel
            id="canvas"
            defaultSize={100}
            className="flex items-center justify-center p-2"
            order={2}
          >
            <Canvas />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>

      <ResizableHandle />

      {searchParams?.editor === 'true' && (
        <ResizablePanel
          id="editor"
          defaultSize={40}
          minSize={30}
          className="mt-[-0.5rem] flex items-center justify-center p-2"
          order={2}
          collapsible
        >
          <Editor />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}

function Canvas() {
  return <canvas className="h-full w-full rounded-lg bg-white" id="canvas" />
}
