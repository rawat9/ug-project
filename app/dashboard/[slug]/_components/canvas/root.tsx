'use client'

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core'
import { useCanvasAtom } from './state'
import { nanoid } from 'nanoid'
import { cn } from '@/lib/utils'
import { DraggableWrapper } from './_components/draggable-wrapper'
import { Element } from './types'

export function Canvas() {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
    data: {
      type: 'canvas',
    },
  })

  const { elements, addElement, setSelectedElement, updateElement } =
    useCanvasAtom()

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, delta } = event
      if (!active) return

      const isNew = active.data.current?.isNewElement

      if (isNew) {
        if (active.id === 'text-widget') {
          const id = nanoid()
          const count = elements.length === 0 ? 1 : elements.length + 1
          const element = {
            id,
            type: 'text',
            name: `text${count}`,
            x: delta.x,
            y: delta.y,
            width: 200,
            height: 50,
            props: {
              value: 'Dummy Text',
              alignment: 'left',
            },
          } satisfies Element

          addElement(element)
          setSelectedElement(element)
        }
      } else {
        const element = elements.find((el) => el.id === active.id)

        if (!element) return

        element.x += delta.x
        element.y += delta.y

        updateElement(element.id, element)
        setSelectedElement(element)
      }
    },
  })

  return (
    <main className="h-full w-full p-2" id="canvas-area">
      {/* <Paper className="absolute" /> */}
      <div
        ref={setNodeRef}
        className={cn(
          'relative h-full w-full rounded-lg border-2 border-dashed',
          isOver && 'border-blue-500',
        )}
      >
        {/* <Grid size={30} /> */}
        {elements.length > 0 &&
          elements.map((element) => (
            <DraggableWrapper key={element.id} element={element} />
          ))}
      </div>
    </main>
  )
}
