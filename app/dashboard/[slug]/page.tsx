import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

import { Editor } from './_components/editor'
import { Canvas } from './_components/canvas'
import { Widgets } from './_components/widgets'
import { Properties } from './_components/properties'
import { State } from './_components/state'

import { Provider as JotaiProvider } from 'jotai'

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    editor?: string
    widgets?: string
    state?: string
  }
}) {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistance"
      className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)]"
    >
      <Widgets isOpen={searchParams?.widgets === 'true'} />
      <State isOpen={searchParams?.state === 'true'} />
      <ResizablePanel
        id="canvas"
        defaultSize={80}
        minSize={0}
        order={1}
        className="relative"
      >
        <Canvas />
        <JotaiProvider>
          <Editor isOpen={searchParams?.editor === 'true'} />
        </JotaiProvider>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        id="properties"
        order={2}
        defaultSize={20}
        maxSize={20}
        className="hidden bg-white md:block"
      >
        <Properties />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
