import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor: string
  }
}) {
  return (
    <ResizablePanelGroup
      direction="vertical"
      autoSaveId="persistance"
      className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)] bg-slate-100"
    >
      <ResizablePanel
        id="canvas"
        defaultSize={60}
        className="flex items-center justify-center p-2"
        order={1}
      >
        <Canvas />
      </ResizablePanel>

      <ResizableHandle className="hover:bg-slate-500" />

      {searchParams?.editor === 'true' && (
        <ResizablePanel
          id="editor"
          minSize={40}
          className="flex items-center justify-center p-2"
          order={2}
          collapsible
        >
          <Editor />
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}

function Element({ type }: { type: string }) {
  return (
    <Button
      variant={'outline'}
      className={'flex h-[100px] w-full cursor-grab flex-col'}
    >
      <p className="">{type}</p>
    </Button>
  )
}

function Canvas() {
  return <canvas className="h-full w-full rounded-lg bg-white" id="canvas" />
}

function Editor() {
  return (
    <div className="h-full w-full rounded-lg bg-white p-2">
      <h1 className="mb-4 text-center">SQL Editor + Schema Viewer</h1>
    </div>
  )
}
