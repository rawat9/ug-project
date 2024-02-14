import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { TextElement } from '../../canvas/types'
import { useState } from 'react'
import { TextInput } from '@tremor/react'

export function TextElementProperties({ element }: { element: TextElement }) {
  const [value, setValue] = useState(element.props.value)
  const { updateElement } = useCanvasAtom()

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        value: e.target.value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
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
  )
}
