import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { Element } from '../../canvas/types'
import { useEffect, useState } from 'react'
import { TextInput } from '@tremor/react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  AlignBottom,
  AlignCenterHorizontally,
  AlignCenterVertically,
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
      <div className="h-px w-full bg-gray-200" />
      <div className="text-gray-500">Alignment</div>
      <div className="flex justify-between px-4">
        <div>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem
              size="sm"
              value="align-left"
              aria-label="Toggle bold"
            >
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-center"
              aria-label="Toggle italic"
            >
              <AlignCenterHorizontally className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-right"
              aria-label="Toggle strikethrough"
            >
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div>
          <ToggleGroup type="single" variant="outline">
            <ToggleGroupItem
              size="sm"
              value="align-left"
              aria-label="Toggle bold"
            >
              <AlignTop className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-center"
              aria-label="Toggle italic"
            >
              <AlignCenterVertically className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              size="sm"
              value="align-right"
              aria-label="Toggle strikethrough"
            >
              <AlignBottom className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  )
}
