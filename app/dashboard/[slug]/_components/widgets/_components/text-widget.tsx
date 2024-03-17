import { Button } from '@/components/ui/button'
import { Text } from '@/icons'

export function TextWidget() {
  return (
    <Button
      variant="outline"
      className="group flex h-full w-full cursor-grab flex-col items-center gap-4 rounded-xl border p-4"
      draggable={true}
      unselectable="on"
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '')
        e.dataTransfer.setData('type', 'text')
        e.dataTransfer.setData('width', '2')
        e.dataTransfer.setData('height', '1')
      }}
    >
      <Text className="h-10 w-10 duration-500 ease-in-out group-hover:scale-125" />
      <p>Text</p>
    </Button>
  )
}
