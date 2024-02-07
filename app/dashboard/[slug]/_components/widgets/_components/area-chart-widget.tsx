import { Button } from '@/components/ui/button'
import { Chart } from '@/icons'

export function AreaChartWidget() {
  return (
    <Button
      variant="outline"
      className="flex h-full w-full cursor-grab flex-col items-center gap-4 rounded border p-4"
    >
      <Chart className="h-10 w-10" />
      <p>Chart</p>
    </Button>
  )
}
