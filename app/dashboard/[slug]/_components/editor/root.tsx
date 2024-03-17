'use client'

import { EditorPanel } from './_components/editor-panel'
import { useAtomValue } from 'jotai'
import { PanelBottom } from '@/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Queries } from './_components/queries'
import { CreateNewQuery } from './_components/create-new-query'
import { QueryMenu } from './_components/query-menu'
import { queriesAtom } from './state'
import * as React from 'react'
import { clamp } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

export function Editor({ isOpen }: { isOpen: boolean }) {
  const queries = useAtomValue(queriesAtom)
  const ref = React.useRef<HTMLDivElement>(null)
  const refTop = React.useRef<HTMLDivElement>(null)

  function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const resizable = ref.current
    if (!resizable) return

    const styles = window.getComputedStyle(resizable)
    let height = parseInt(styles.height, 10)
    let y = 0

    const onMouseMoveTopResize = (event: MouseEvent) => {
      event.preventDefault()
      const dy = event.clientY - y
      height = height - dy
      y = event.clientY
      resizable.style.height = `${clamp(height, 36, 700)}px` // minH, maxH
    }

    const onMouseUpTopResize = () => {
      document.removeEventListener('mousemove', onMouseMoveTopResize)
      document.removeEventListener('mouseup', onMouseUpTopResize)
    }

    y = event.clientY

    document.addEventListener('mousemove', onMouseMoveTopResize)
    document.addEventListener('mouseup', onMouseUpTopResize)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{
            type: 'tween',
            ease: 'easeInOut',
            duration: 0.4,
          }}
          ref={ref}
          className="absolute bottom-0 z-50 block h-[360px] w-full border-t bg-white shadow-[0px_-2px_5px_-3px_rgba(0,0,0,0.1)]"
        >
          <div
            ref={refTop}
            className="absolute -inset-y-[2px] left-0 right-0 h-1 cursor-row-resize transition hover:bg-tremor-brand"
            onMouseDown={handleMouseDown}
          />
          <div className="flex h-9 w-full items-center border-b px-2">
            <div className="flex w-[85%] items-center">
              <CreateNewQuery />
              <div className="ml-2 h-9 w-px bg-slate-200" />
              <QueryMenu />
              <div className="h-9 w-px bg-slate-200" />
              <Queries />
            </div>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-auto p-1">
                    <PanelBottom className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Toggle editor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {queries.length > 0 ? (
            <EditorPanel />
          ) : (
            <div className="flex h-full w-full justify-center bg-slate-50 py-8">
              <div className="flex h-[80%] w-[80%] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-gray-500">You don&apos;t have any queries</p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
