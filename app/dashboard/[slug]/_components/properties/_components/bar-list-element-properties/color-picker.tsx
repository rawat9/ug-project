import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, colors, getColor } from '@/lib/utils'
import type { Color } from '@tremor/react'
import { Cross } from '@/icons'
import { useState } from 'react'

export function ColorPicker({
  color,
  onColorChange,
}: {
  color: string
  onColorChange: (value: Color) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <p className="text-xs font-medium text-slate-500">Color</p>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-md border border-slate-100 bg-gray-50 p-2">
            <div
              className={`h-7 w-7 rounded-md bg-${[color]}-500 bg-opacity-30`}
            />
            <div>
              <p className="text-sm text-slate-800">{color}</p>
              <p className="text-xs text-slate-400">
                {getColor(color as Color)}
              </p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="-translate-x-full"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between">
            <p className="flex-1 text-sm text-slate-500">Colors</p>
            <button onClick={() => setIsOpen(false)}>
              <Cross />
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2 py-4">
            {colors.map((color, index) => (
              <button
                key={index}
                className={cn(
                  'h-8 w-full rounded-md py-1 shadow-md',
                  `bg-${color}-500`,
                )}
                onClick={() => onColorChange(color)}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
