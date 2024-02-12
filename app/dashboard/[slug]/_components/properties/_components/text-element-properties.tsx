import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { Element } from '../../canvas/types'
import { useEffect, useState } from 'react'
import { TextInput } from '@tremor/react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  AlignBottom,
  AlignCenter,
  AlignMiddle,
  AlignLeft,
  AlignRight,
  AlignTop,
} from '@/icons'

export function TextElementProperties({
  selectedElement,
}: {
  selectedElement: Element
}) {
  const [value, setValue] = useState(selectedElement.props.value)
  const { updateElement } = useCanvasAtom()

  useEffect(() => {
    setValue(selectedElement.props.value)
  }, [selectedElement.props])

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    updateElement(selectedElement.id, {
      ...selectedElement,
      props: {
        ...selectedElement.props,
        value: e.target.value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="px-4">
        <Label htmlFor="value" className="text-xs text-slate-500">
          Value
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="value"
          value={value}
          onChange={handleValueChange}
        />
      </div>
      <div className="my-4 h-px w-full bg-gray-200" />
      <div className="p-2 text-sm text-gray-500">Alignment</div>
      <div className="flex justify-between px-4">
        <div>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem
              size="sm"
              value="align-left"
              aria-label="Toggle align left"
            >
              <AlignLeft className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-center"
              aria-label="Toggle align center"
            >
              <AlignCenter className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-right"
              aria-label="Toggle align right"
            >
              <AlignRight className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem
              size="sm"
              value="align-top"
              aria-label="Toggle align top"
            >
              <AlignTop className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-middle"
              aria-label="Toggle align middle"
            >
              <AlignMiddle className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-bottom"
              aria-label="Toggle align bottom"
            >
              <AlignBottom className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
