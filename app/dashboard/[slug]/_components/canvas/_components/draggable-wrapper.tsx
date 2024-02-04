import { useDndMonitor, useDraggable } from '@dnd-kit/core'
import { useCanvasAtom } from '../state'
import { BaseElement } from './elements/_base-element'
import { Element } from '../types'
import { Badge } from '@tremor/react'
import { useState } from 'react'

import { ResizableBox } from 'react-resizable'
import { ResizeHandle } from './resize-handle'

export function DraggableWrapper({ element }: { element: Element }) {
  const { setSelectedElement } = useCanvasAtom()
  const [show, setShow] = useState(true)

  useDndMonitor({
    onDragEnd: () => {
      setShow(true)
      setSelectedElement(element)
    },
  })

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
    data: {
      type: 'text',
      isNewElement: false,
    },
  })

  const tstyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {}

  const style = {
    position: 'relative',
    left: `${element.x}px`,
    top: `${element.y}px`,
  } as const

  return (
    <ResizableBox
      width={200}
      height={40}
      style={{ ...style, ...tstyle }}
      resizeHandles={['e', 'w']}
      handle={<ResizeHandle handleAxis="x" />}
    >
      <div
        id={element.id}
        ref={setNodeRef}
        className="z-90 h-full w-full rounded-md border border-dashed border-gray-400 p-2 ring-1 ring-inset ring-blue-400 hover:cursor-pointer"
        onBlur={() => setShow(false)}
        {...attributes}
        {...listeners}
      >
        {show && (
          <Badge className="absolute bottom-10 left-0">{element.name}</Badge>
        )}
        <BaseElement element={element} />
      </div>
    </ResizableBox>
  )
}
