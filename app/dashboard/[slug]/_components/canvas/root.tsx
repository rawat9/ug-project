import { useCanvasAtom } from './state'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'
import { Element } from './types'
import { GridLayout } from './_components/grid-layout'
import { BaseElement } from './_components/elements/_base-element'
import { Layout } from 'react-grid-layout'
import { useRef, useState } from 'react'
import { Badge } from '@tremor/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useClickOutsideSelectedElementButInsideCanvas } from '@/hooks'

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
    selectedElement,
  } = useCanvasAtom()

  const [layout, setLayout] = useState<Layout[]>([])
  const [resizableId, setResizableId] = useState('')

  function onDrop(_layout: Layout[], item: Layout, e: DragEvent) {
    const w = e.dataTransfer?.getData('width')
    const h = e.dataTransfer?.getData('height')
    const type = e.dataTransfer?.getData('type') ?? ''
    const count = elements.length === 0 ? 1 : elements.length + 1

    item.w = w ? parseInt(w) : 1
    item.h = h ? parseInt(h) : 1
    const element = {
      id: nanoid(),
      type: type as Element['type'],
      name: `${type}${count}`,
      x: item.x,
      y: item.y,
      width: item.w,
      height: item.h,
      props: {
        value: 'Dummy Text',
        alignment: 'left',
      },
    } satisfies Element
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

  function addNewLayoutItem(element: Element) {
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
        onDragStart={onDragStart}
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
