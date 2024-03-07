import { Button } from '@/components/ui/button'
import { Card } from '@/icons/widgets/Card'

export function CardWidget() {
  return (
    <Button
      variant="outline"
      className="group flex h-full w-full cursor-grab flex-col items-center gap-4 rounded-xl border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'card')
        e.dataTransfer.setData('width', '3')
        e.dataTransfer.setData('height', '4')
      }}
    >
      <Card className="h-10 w-10 duration-500 ease-in-out group-hover:scale-125" />
      <p>Card</p>
    </Button>
  )
}
