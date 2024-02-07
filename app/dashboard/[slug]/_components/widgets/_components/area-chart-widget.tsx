import { Button } from '@/components/ui/button'
import { Chart } from '@/icons'

export function AreaChartWidget() {
  return (
    <Button
      variant="outline"
      className="flex h-full w-full cursor-grab flex-col items-center gap-4 rounded border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'area-chart')
        e.dataTransfer.setData('width', '5')
        e.dataTransfer.setData('height', '4')
      }}
    >
      <Chart className="h-10 w-10" />
      <p>Area Chart</p>
    </Button>
  )
}
