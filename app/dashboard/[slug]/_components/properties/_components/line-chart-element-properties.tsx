'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { LineChartElement } from '../../canvas/types'
import { useState } from 'react'
import {
  MultiSelect,
  MultiSelectItem,
  TextInput,
  Select,
  SelectItem,
} from '@tremor/react'
import lodashResult from 'lodash/result'
import lodashKeyBy from 'lodash/keyBy'
import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../editor/state'
import { Column } from '@/types'

export function LineChartElementProperties({
  element,
}: {
  element: LineChartElement
}) {
  const { header: initialValue } = element.props

  const [header, setHeader] = useState(initialValue)
  const [dataKey, setDataKey] = useState('')
  const { updateElement } = useCanvasAtom()

  const queries = useAtomValue(queriesAtom)
  const [cols, setCols] = useState<string[]>([])

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

  function handleDataChange(value: string) {
    setDataKey(value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        dataKey: value,
      },
    })
    try {
      const interpolate = /{{\s*([^{}]+?)\s*}}/g
      const match = value.match(interpolate)

      if (match) {
        const result = lodashResult(
          lodashKeyBy(queries, 'name'),
          match[0].replace(/{{\s*|\s*}}/g, ''),
        ) as
          | {
              data: unknown[]
              columns: Column[]
            }
          | undefined

        if (result) {
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              data: result.data,
              // columns: result.columns,
            },
          })
          setCols(result.columns.map((c) => c.name))
        }
      }
    } catch {}
  }

  function handleYAxisChange(value: string[]) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        yAxis: value,
      },
    })
  }

  function handleXAxisChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        xAxis: value,
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
          <Label htmlFor="data-key" className="text-xs text-slate-500">
            Chart data
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="data-key"
            placeholder="{{ getChartData }}"
            className="font-mono text-xs placeholder:font-mono"
            value={dataKey}
            onValueChange={handleDataChange}
          />
        </div>
        <div>
          <Label htmlFor="x-axis" className="text-xs text-slate-500">
            X Axis
          </Label>
          <Select
            id="x-axis"
            value={element.props.xAxis}
            onValueChange={handleXAxisChange}
          >
            {cols.map((col) => (
              <SelectItem key={col} value={col}>
                {col}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="y-axis" className="text-xs text-slate-500">
            Y Axis
          </Label>
          <MultiSelect
            id="y-axis"
            value={element.props.yAxis}
            onValueChange={handleYAxisChange}
          >
            {cols.map((col) => (
              <MultiSelectItem key={col} value={col}>
                {col}
              </MultiSelectItem>
            ))}
          </MultiSelect>
        </div>
      </div>
    </div>
  )
}
