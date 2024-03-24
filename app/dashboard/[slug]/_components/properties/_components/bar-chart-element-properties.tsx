'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { BarChartElement } from '../../canvas/types'
import { useState } from 'react'
import { TextInput } from '@tremor/react'
import { Select, SelectItem } from '@tremor/react'

export function BarChartElementProperties({
  element,
}: {
  element: BarChartElement
}) {
  const { header: initialValue } = element.props

  const [header, setHeader] = useState(initialValue)
  const { updateElement } = useCanvasAtom()

  function handleHeaderChange(value: string) {
    setHeader(value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        header: value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4 px-4">
        <div>
          <Label htmlFor="header" className="text-xs text-slate-500">
            Chart header
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="header"
            value={header}
            onValueChange={handleHeaderChange}
          />
        </div>
        <div>
          <Label htmlFor="data-source" className="text-xs text-slate-500">
            Chart data
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="data-source"
            placeholder="{{ getChartData }}"
            className="font-mono text-xs placeholder:font-mono"
          />
        </div>
        <div>
          <Label htmlFor="data-source" className="text-xs text-slate-500">
            X Axis
          </Label>
          <Select>
            <SelectItem value="1">Option One</SelectItem>
            <SelectItem value="2">Option Two</SelectItem>
            <SelectItem value="3">Option Three</SelectItem>
          </Select>
        </div>
        <div>
          <Label htmlFor="data-source" className="text-xs text-slate-500">
            Y Axis
          </Label>
          <Select>
            <SelectItem value="1">Option One</SelectItem>
            <SelectItem value="2">Option Two</SelectItem>
            <SelectItem value="3">Option Three</SelectItem>
          </Select>
        </div>
      </div>
    </div>
  )
}
