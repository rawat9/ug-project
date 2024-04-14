'use client'

import { elementsAtom, useCanvasAtom } from './state'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'
import GridLayout from './_components/grid-layout'
import { BaseElement } from './_components/elements/_base-element'
import { type Layout } from 'react-grid-layout'
import { Badge } from '@tremor/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getElementProps } from '../utils'

import { useEffect, useRef, useState } from 'react'
import { type Element } from './types'
import {
  useAutosave,
  useClickOutsideSelectedElementButInsideCanvas,
} from '@/hooks'
import { useAtomValue, useSetAtom } from 'jotai'
import { fetchCanvas, saveCanvas } from '@/lib/data/server/dashboard'
import { draggedWidget } from '../widgets/state'
import { queriesAtom } from '../editor/state'
import { fetchQueries } from '@/lib/data/client/queries'

export function Canvas({ isPreview = false }: { isPreview?: boolean }) {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const {
    elements,
    addElement,
    updateElement,
    selectedElement,
    setSelectedElement,
  } = useCanvasAtom()

  const [layout, setLayout] = useState<Layout[]>([])
  const [resizableId, setResizableId] = useState('')
  const activeWidget = useAtomValue(draggedWidget)

  const set = useSetAtom(elementsAtom)
  const setQueries = useSetAtom(queriesAtom)

  useEffect(() => {
    async function initialiseCanvas() {
      const id = pathname.split('/')[2] ?? ''
      const { elements } = await fetchCanvas(id)
      const { data } = await fetchQueries()
      set(elements)
      setQueries(data ?? [])
      setLayout(elements.map(addNewLayoutItem))
    }
    initialiseCanvas()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = async () => {
    if (!elements.length) return
    if (isPreview) return

    const id = pathname.split('/')[2] ?? ''
    await saveCanvas(id, elements)
  }

  useAutosave({
    data: elements,
    onSave: handleSave,
    interval: 2000,
  })

  function onDrop(_layout: Layout[], item: Layout, e: DragEvent) {
    const w = e.dataTransfer?.getData('width')
    const h = e.dataTransfer?.getData('height')
    const minH = e.dataTransfer?.getData('minHeight')
    const type = (e.dataTransfer?.getData('type') ?? '') as Element['type']
    const count = elements.length === 0 ? 1 : elements.length + 1

    item.w = w ? parseInt(w) : 1
    item.h = h ? parseInt(h) : 1
    item.minH = minH ? parseInt(minH) : undefined
    const element = {
      id: nanoid(),
      name: `${type}${count}`,
      x: item.x,
      y: item.y,
      width: item.w,
      height: item.h,
      minHeight: item.minH,
      type,
      props: getElementProps(type),
    } as Element
    addElement(element)
    setSelectedElement(element)
    setResizableId(element.id)
    setLayout((prev) => [...prev, addNewLayoutItem(element)])
  }

  const canvasRef = useRef<HTMLDivElement>(null)

  useClickOutsideSelectedElementButInsideCanvas(canvasRef, () => {
    setSelectedElement(null)
    setResizableId('')
  })

  function addNewLayoutItem(element: Element): Layout {
    return {
      i: element.id,
      x: element.x,
      y: element.y,
      w: element.width,
      h: element.height,
      minH: element.minHeight,
    }
  }

  function onLayoutChange(layout: Layout[]) {
    setLayout(layout)
  }

  function onDragStart(_layout: Layout[], oldItem: Layout) {
    const element = elements.find((el) => el.id === oldItem.i)
    if (element) {
      setSelectedElement(element)
      setResizableId(element.id)
    }
  }

  function onDrag(_layout: Layout[], oldItem: Layout, newItem: Layout) {
    // don't do anything if the position hasn't changed
    if (oldItem.x === newItem.x && oldItem.y === newItem.y) return

    if (params.has('widgets')) {
      params.delete('widgets')
      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    }

    if (params.has('state')) {
      params.delete('state')
      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    }
  }

  function onDragStop(_layout: Layout[], oldItem: Layout, newItem: Layout) {
    // don't do anything if the position hasn't changed
    if (oldItem.x === newItem.x && oldItem.y === newItem.y) return

    if (!selectedElement) return
    selectedElement.x = newItem.x
    selectedElement.y = newItem.y

    updateElement(newItem.i, selectedElement)
  }

  function onResizeStop(_layout: Layout[], oldItem: Layout, newItem: Layout) {
    // don't do anything if the size hasn't changed
    if (oldItem.w === newItem.w && oldItem.h === newItem.h) return

    if (!selectedElement) return
    selectedElement.width = newItem.w
    selectedElement.height = newItem.h

    updateElement(newItem.i, selectedElement)
  }

  function onDropDragOver() {
    if (!activeWidget) {
      return { w: 1, h: 1 }
    }

    return {
      w: activeWidget.w,
      h: activeWidget.h,
    }
  }

  return (
    <main
      className="h-full w-full bg-zinc-100 px-20 py-4 font-canvas"
      id="canvas"
    >
      <div
        className="h-full w-full overflow-y-auto rounded-sm border bg-zinc-50 shadow-sm"
        ref={canvasRef}
      >
        <GridLayout
          onDrop={onDrop}
          layout={layout}
          onLayoutChange={onLayoutChange}
          onDrag={onDrag}
          onDragStop={onDragStop}
          onDragStart={onDragStart}
          onResizeStop={onResizeStop}
          innerRef={canvasRef}
          onDropDragOver={onDropDragOver}
          isResizable={!isPreview}
          isDraggable={!isPreview}
        >
          {elements.map((element) => (
            <div
              key={element.id}
              className={cn(
                'flex h-full w-full cursor-pointer select-none items-center p-1',
                !isPreview &&
                  'hover:rounded-tremor-default hover:ring-1 hover:ring-inset hover:ring-blue-500',
                selectedElement?.id === element?.id &&
                  resizableId &&
                  'ring-1 ring-inset ring-blue-500 hover:rounded-none',
                resizableId !== element.id && 'react-resizable-hide',
                !selectedElement && 'react-resizable-hide',
              )}
            >
              {selectedElement?.id === element.id && resizableId && (
                <Badge
                  size="sm"
                  className="fixed -left-[1px] -top-[30px] shadow-sm"
                >
                  {element.name}
                </Badge>
              )}
              <BaseElement element={element} />
            </div>
          ))}
        </GridLayout>
      </div>
    </main>
  )
}
