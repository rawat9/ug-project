import { Button } from '@/components/ui/button'
import { Text } from '@/icons'
import { useDraggable } from '@dnd-kit/core'

export function TextWidget() {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: 'text-widget',
    data: {
      type: 'text',
      isNewElement: true,
      width: 100,
      height: 50,
    },
  })

  const tstyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {}

  return (
    <Button
      ref={setNodeRef}
      style={{ ...tstyle }}
      variant="outline"
      className="flex h-full w-full cursor-grab flex-col items-center gap-4 rounded border p-4"
      {...listeners}
      {...attributes}
    >
      <Text className="h-10 w-10" />
      <p>Text</p>
    </Button>
  )
}
