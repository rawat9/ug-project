import { Button } from '@/components/ui/button'
import { Table } from '@/icons'

export function TableWidget() {
  return (
    <Button
      variant="outline"
      className="flex h-full w-full cursor-grab flex-col items-center gap-4 rounded border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'table')
        e.dataTransfer.setData('width', '8')
        e.dataTransfer.setData('height', '12')
      }}
    >
      <Table className="h-10 w-10" />
      <p>Table</p>
    </Button>
  )
}
