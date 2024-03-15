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

import { elementsAtom } from './_components/canvas/state'
import { saveCanvas } from '@/lib/data'
import { useAutosave } from '@/hooks'
import { Provider, useAtomValue } from 'jotai'

export default function Page({
  searchParams,
}: {
  searchParams?: {
    editor?: string
    widgets?: string
    state?: string
  }
}) {
  // const pathname = usePathname()
  // const elements = useAtomValue(elementsAtom)

  // const handleSave = async () => {
  //   if (!elements.length) return

  //   await saveCanvas(params.slug, elements)
  // }

  // useAutosave({
  //   data: elements,
  //   onSave: handleSave,
  // })

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
        <Provider>
          <Editor isOpen={searchParams?.editor === 'true'} />
        </Provider>
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
