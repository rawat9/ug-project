import { Button } from '@/components/ui/button'
import { Card } from '@/icons/widgets/Card'
import { useDraggable } from '@dnd-kit/core'

export function CardWidget() {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: 'card',
    data: {
      type: 'card',
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
      <Card className="h-10 w-10" />
      <p>Card</p>
    </Button>
  )
}
