import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function DragOverlayWrapper() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  useDndMonitor({
    onDragStart(event) {
      setDraggedItem(event.active)
    },
    onDragEnd() {
      setDraggedItem(null)
      params.delete('widgets')
      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      })
    },
    onDragCancel() {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) {
    return null
  }

  const isNew = draggedItem.data.current?.isNewElement
  const width = draggedItem.data.current?.width
  const height = draggedItem.data.current?.height

  const node = isNew ? (
    <div
      className={`h-[${height}px] w-[${width}px] border bg-blue-400 opacity-20`}
    />
  ) : null

  return <DragOverlay>{node}</DragOverlay>
}
