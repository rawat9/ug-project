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
import { elementsAtom } from './_components/canvas/state'
import { saveCanvas } from '@/lib/data'
import { useAutosave } from '@/hooks'
import { useAtomValue } from 'jotai'

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    editor?: string
    widgets?: string
  }
}) {
  const elements = useAtomValue(elementsAtom)

  const handleSave = async () => {
    if (!elements.length) return

    await saveCanvas(params.slug, elements)
  }

  useAutosave({
    data: elements,
    onSave: handleSave,
  })

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="persistance"
      className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)] bg-zinc-50"
    >
      <ResizablePanel order={1} defaultSize={80}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel id="canvas" minSize={60} order={1}>
            <Canvas />
          </ResizablePanel>
          <ResizableHandle />
          <Editor isOpen={searchParams?.editor === 'true'} />
        </ResizablePanelGroup>
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
      <Widgets isOpen={searchParams?.widgets === 'true'} />
    </ResizablePanelGroup>
  )
}
