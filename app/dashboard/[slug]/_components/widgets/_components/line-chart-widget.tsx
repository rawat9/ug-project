import { Button } from '@/components/ui/button'
import { LineChart } from '@/icons'
import { useSetAtom } from 'jotai'
import { draggedWidget } from '../state'

export function LineChartWidget() {
  const setDraggedWidget = useSetAtom(draggedWidget)

  return (
    <Button
      variant="outline"
      className="group flex h-full w-full cursor-grab flex-col items-center gap-4 rounded-xl border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        setDraggedWidget({
          i: 'line-chart',
          w: 6,
          h: 10,
        })
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'line-chart')
        e.dataTransfer.setData('width', '6')
        e.dataTransfer.setData('height', '10')
      }}
    >
      <LineChart className="h-10 w-10 duration-500 ease-in-out group-hover:scale-125" />
      <p>Line Chart</p>
    </Button>
  )
}
