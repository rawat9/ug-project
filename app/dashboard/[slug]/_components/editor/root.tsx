'use client'

import { EditorPanel } from './_components/editor-panel'
import {
  PanelLeftClose,
  PanelBottomOpen,
  PanelLeftOpen,
  PanelBottomClose,
} from '@/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Queries } from './_components/queries'
import { CreateNewQuery } from './_components/create-new-query'
import * as React from 'react'
import { clamp } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { QuerySidebar } from './_components/query-sidebar'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { fetchQueries } from '@/lib/data/queries'
import { useAtomValue } from 'jotai'
import { activeQueryAtom } from './state'
import { ImperativePanelHandle } from 'react-resizable-panels'

export function Editor({ isOpen }: { isOpen: boolean }) {
  const activeQuery = useAtomValue(activeQueryAtom)
  const sidebarRef = React.useRef<ImperativePanelHandle>(null)
  const [isExpanded, setIsExpanded] = React.useState(true) // for panel
  const [isCollapsed, setIsCollapsed] = React.useState(false) // for sidebar
  const heightRef = React.useRef(0)

  const { data: queries, isError } = useQuery({
    queryKey: ['queries'],
    queryFn: fetchQueries,
    select: (it) => it.data,
  })

  if (isError) {
    toast.error('Error fetching queries', { position: 'top-center' })
  }

  const ref = React.useRef<HTMLDivElement>(null)
  const refTop = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      heightRef.current = ref.current.clientHeight
    }
  }, [])

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

      if (height === 36) {
        setIsExpanded(false)
      }
      heightRef.current = height
    }

    const onMouseUpTopResize = () => {
      document.removeEventListener('mousemove', onMouseMoveTopResize)
      document.removeEventListener('mouseup', onMouseUpTopResize)
    }

    y = event.clientY

    document.addEventListener('mousemove', onMouseMoveTopResize)
    document.addEventListener('mouseup', onMouseUpTopResize)
  }

  function handleResize() {
    if (sidebarRef.current?.isExpanded()) {
      setIsCollapsed(true)
      return sidebarRef.current?.collapse()
    }
    setIsCollapsed(false)
    return sidebarRef.current?.expand()
  }

  function handleCollapsePanel() {
    const resizable = ref.current
    if (!resizable) return

    if (isExpanded) {
      resizable.style.height = '36px'
      setIsExpanded(false)
      return
    }

    if (heightRef.current <= 36) {
      resizable.style.height = '360px'
      setIsExpanded(true)
      return
    }

    resizable.style.height = `${heightRef.current}px`
    setIsExpanded(true)
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
          className="absolute bottom-0 z-[50] block h-[360px] w-full border-t bg-white shadow-[0px_-2px_5px_-3px_rgba(0,0,0,0.1)]"
        >
          <div
            ref={refTop}
            className="absolute -inset-y-[2px] left-0 right-0 h-1 cursor-row-resize transition hover:bg-tremor-brand"
            onMouseDown={handleMouseDown}
          />
          <div className="flex h-9 w-full items-center border-b">
            <div className="flex w-[85%] items-center">
              <button className="p-2 focus:outline-0" onClick={handleResize}>
                {isCollapsed ? (
                  <PanelLeftOpen className="h-5 w-5 text-slate-500" />
                ) : (
                  <PanelLeftClose className="h-5 w-5 text-slate-500" />
                )}
              </button>
              <div className="mr-2 h-9 w-px bg-slate-200" />
              <CreateNewQuery />
              <div className="ml-2 h-9 w-px bg-slate-200" />
              <Queries />
            </div>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="ml-auto px-2"
                    onClick={handleCollapsePanel}
                  >
                    {isExpanded ? (
                      <PanelBottomClose className="h-5 w-5 text-slate-500 hover:text-slate-700" />
                    ) : (
                      <PanelBottomOpen className="h-5 w-5 text-slate-500 hover:text-slate-700" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Toggle editor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              id="sidebar"
              defaultSize={15}
              maxSize={20}
              minSize={15}
              ref={sidebarRef}
              order={1}
              collapsedSize={0}
              collapsible
            >
              {queries && queries.length > 0 ? (
                <QuerySidebar queries={queries} activeQuery={activeQuery} />
              ) : (
                <div className="flex h-full w-full justify-center p-4">
                  <div className="flex h-[80%] w-[90%] items-center justify-center rounded-md border-2 border-dashed">
                    <p className="text-sm text-gray-500">
                      You don&apos;t have any queries
                    </p>
                  </div>
                </div>
              )}
            </ResizablePanel>
            <ResizableHandle />
            {activeQuery ? (
              <EditorPanel />
            ) : (
              <ResizablePanel
                id="placeholder"
                order={2}
                className="bg-zinc-50"
              />
            )}
          </ResizablePanelGroup>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
