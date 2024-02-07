'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Editor } from './_components/editor'
import { Canvas } from './_components/canvas'
import { Widgets } from './_components/widgets'
import { Properties } from './_components/properties'
import { Provider as JotaiProvider } from 'jotai'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor?: string
    widgets?: string
  }
}) {
  return (
    <>
      <ResizablePanelGroup
        direction="vertical"
        autoSaveId="persistance"
        className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)] bg-zinc-50"
      >
        <JotaiProvider>
          <ResizablePanel
            id="canvas"
            defaultSize={100}
            className="flex items-center justify-center"
            order={2}
          >
            <Canvas />
          </ResizablePanel>

          <ResizableHandle className="bg-slate-100" />
          <Widgets isOpen={searchParams?.widgets === 'true'} />
          <Editor isOpen={searchParams?.editor === 'true'} />
          <Properties />
        </JotaiProvider>
      </ResizablePanelGroup>
    </>
  )
}
