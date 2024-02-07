import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { Element } from '../../canvas/types'
import { useEffect, useState } from 'react'
import { TextInput } from '@tremor/react'

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
