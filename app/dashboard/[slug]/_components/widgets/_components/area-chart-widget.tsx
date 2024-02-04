import { Button } from '@/components/ui/button'
import { Chart } from '@/icons'
import { useDraggable } from '@dnd-kit/core'

export function AreaChartWidget() {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: 'chart',
    data: {
      type: 'chart',
    },
  })

  return (
    <Button
      ref={setNodeRef}
      variant="outline"
      className="flex h-full w-full cursor-grab flex-col items-center gap-4 rounded border p-4"
      {...listeners}
      {...attributes}
    >
      <Chart className="h-10 w-10" />
      <p>Chart</p>
    </Button>
  )
}
