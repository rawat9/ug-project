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
          <ResizablePanel order={1} defaultSize={60}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel id="canvas" defaultSize={80} order={1}>
                <Canvas />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel
                id="properties"
                order={2}
                defaultSize={20}
                className="bg-white drop-shadow-xl"
              >
                <Properties />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </JotaiProvider>
        <Editor isOpen={searchParams?.editor === 'true'} />
        <Widgets isOpen={searchParams?.widgets === 'true'} />
      </ResizablePanelGroup>
    </>
  )
}
