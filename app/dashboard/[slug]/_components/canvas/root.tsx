import { elementsAtom, useCanvasAtom } from './state'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'
import { GridLayout } from './_components/grid-layout'
import { BaseElement } from './_components/elements/_base-element'
import { Layout } from 'react-grid-layout'
import { Badge } from '@tremor/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useClickOutsideSelectedElementButInsideCanvas } from '@/hooks'
import { useSetAtom } from 'jotai'
import { fetchCanvas } from '@/lib/data'
import { getElementProps } from '../utils'

import { useEffect, useRef, useState } from 'react'
import { type Element } from './types'

export function Canvas() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const {
    elements,
    addElement,
    setSelectedElement,
    removeElement,
    updateElement,
    selectedElement,
  } = useCanvasAtom()

  const [layout, setLayout] = useState<Layout[]>([])
  const [resizableId, setResizableId] = useState('')
  const set = useSetAtom(elementsAtom)

  useEffect(() => {
    async function fetch() {
      const id = pathname.split('/')[2] ?? ''
      const { elements } = await fetchCanvas(id)
      set(elements)
      setLayout(elements.map(addNewLayoutItem))
    }
    fetch()
  }, [set, pathname])

  function onDrop(_layout: Layout[], item: Layout, e: DragEvent) {
    const w = e.dataTransfer?.getData('width')
    const h = e.dataTransfer?.getData('height')
    const type = (e.dataTransfer?.getData('type') ?? '') as Element['type']
    const count = elements.length === 0 ? 1 : elements.length + 1

    item.w = w ? parseInt(w) : 1
    item.h = h ? parseInt(h) : 1
    const element = {
      id: nanoid(),
      name: `${type}${count}`,
      x: item.x,
      y: item.y,
      width: item.w,
      height: item.h,
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

  function remove(id: string) {
    setSelectedElement(null)
    setLayout((prev) => prev.filter((el) => el.i !== id))
    removeElement(id)
  }

  return (
    <main className="h-full w-full font-canvas" id="canvas">
      <GridLayout
        onDrop={onDrop}
        layout={layout}
        onLayoutChange={onLayoutChange}
        onDrag={onDrag}
        onDragStop={onDragStop}
        onDragStart={onDragStart}
        onResizeStop={onResizeStop}
        innerRef={canvasRef}
        useCSSTransforms={true}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className={cn(
              'relative flex h-full w-full cursor-pointer select-none items-center rounded-md p-2',
              selectedElement?.id === element?.id &&
                resizableId &&
                'border border-dashed border-gray-400 ring-1 ring-inset ring-blue-400',
              resizableId !== element.id && 'react-resizable-hide',
            )}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                remove(element.id)
              }
            }}
          >
            {selectedElement?.id === element.id && resizableId && (
              <Badge size="xs" className="fixed -left-[1px] -top-[30px]">
                {element.name}
              </Badge>
            )}
            <BaseElement element={element} />
          </div>
        ))}
      </GridLayout>
    </main>
  )
}
