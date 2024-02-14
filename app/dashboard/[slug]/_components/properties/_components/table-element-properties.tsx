import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { TableElement } from '../../canvas/types'
import { useEffect, useState } from 'react'
import { TextInput } from '@tremor/react'

export function TableElementProperties({ element }: { element: TableElement }) {
  const [value, setValue] = useState(element.props.name)
  const { updateElement } = useCanvasAtom()

  useEffect(() => {
    setValue(element.props.name)
  }, [element])

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        name: e.target.value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="value" className="text-xs text-slate-500">
        Name
      </Label>
      <TextInput
        type="text"
        autoComplete="off"
        id="value"
        value={value}
        onChange={handleValueChange}
      />
      <div className="w-px bg-gray-300" />
    </div>
  )
}
