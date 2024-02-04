'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Editor } from './_components/editor/root'
import { Canvas } from './_components/canvas/root'
import { Widgets } from './_components/widgets/root'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { DragOverlayWrapper } from './_components/canvas/_components/drag-overlay-wrapper'
import { createSnapModifier } from '@dnd-kit/modifiers'
import * as React from 'react'
import { Provider } from 'jotai'
import { Properties } from './_components/properties'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor?: string
    widgets?: string
  }
}) {
  const snapToGrid = React.useMemo(() => createSnapModifier(30), [])
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
      delay: 10,
      tolerance: 5,
    },
  })
  const sensors = useSensors(pointerSensor)

  return (
    <>
      <ResizablePanelGroup
        direction="vertical"
        autoSaveId="persistance"
        className="fixed left-12 top-14 z-10 max-h-[calc(100vh_-_3.5rem)] max-w-[calc(100vw_-_3rem)] bg-zinc-50"
      >
        <Provider>
          <DndContext
            sensors={sensors}
            // modifiers={[restrictToParentElement]}
          >
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
            <DragOverlayWrapper />
          </DndContext>
          <Properties />
          <Editor isOpen={searchParams?.editor === 'true'} />
        </Provider>
      </ResizablePanelGroup>
    </>
  )
}
