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
import { State } from './_components/state'
import { AnimatePresence, motion } from 'framer-motion'

import { elementsAtom } from './_components/canvas/state'
import { saveCanvas } from '@/lib/data'
import { useAutosave } from '@/hooks'
import { useAtomValue } from 'jotai'
import { usePathname, useRouter } from 'next/navigation'

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
  const param = new URLSearchParams(searchParams)
  const { replace } = useRouter()
  const pathname = usePathname()
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
      {(searchParams?.state || searchParams?.widgets) && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{
              type: 'tween',
              duration: 0.2,
            }}
            className="absolute left-2 top-2 z-50 block h-[550px] w-[300px] rounded-md bg-white shadow-md"
          >
            {searchParams?.widgets === 'true' && (
              <Widgets
                onCollapse={() => {
                  param.delete('widgets')
                  replace(`${pathname}?${param.toString()}`, { scroll: false })
                }}
              />
            )}
            {searchParams?.state === 'true' && (
              <State
                onCollapse={() => {
                  param.delete('state')
                  replace(`${pathname}?${param.toString()}`, { scroll: false })
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
      <ResizablePanel
        id="canvas"
        defaultSize={80}
        minSize={0}
        order={1}
        className="relative"
      >
        <Canvas />
        <Editor isOpen={searchParams?.editor === 'true'} />
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
