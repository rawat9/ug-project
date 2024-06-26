import { Button } from '@/components/ui/button'
import { BarList } from '@/icons'
import { draggedWidget } from '../state'
import { useSetAtom } from 'jotai'

export function BarListWidget() {
  const setDraggedWidget = useSetAtom(draggedWidget)

  return (
    <Button
      variant="outline"
      className="group flex h-full w-full cursor-grab flex-col items-center gap-4 rounded-xl border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        setDraggedWidget({
          i: 'bar-list',
          w: 6,
          h: 10,
        })
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'bar-list')
        e.dataTransfer.setData('width', '6')
        e.dataTransfer.setData('height', '10')
      }}
    >
      <BarList className="h-10 w-10 duration-500 ease-in-out group-hover:scale-125" />
      <p>Bar List</p>
    </Button>
  )
}
