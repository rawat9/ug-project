'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../../canvas/state'
import { BarListElement } from '../../../canvas/types'
import { TextInput, Color } from '@tremor/react'

import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../../editor/state'
import { Column } from '@/types'
import { Help } from '@/icons'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ColorPicker } from './color-picker'

export function BarListElementProperties({
  element,
}: {
  element: BarListElement
}) {
  const { updateElement } = useCanvasAtom()
  const queries = useAtomValue(queriesAtom)

  function handleHeaderChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        title: value,
      },
    })
  }

  function handleDataChange(value: string) {
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
              data: Record<string, string | number>[]
              columns: Column[]
            }
          | undefined

        if (result) {
          const guessName =
            result.columns.find((col) => col.dtype === 'text')?.name ?? ''
          const guessValue =
            result.columns.find(
              (col) =>
                col.dtype.startsWith('int') || col.dtype.startsWith('float'),
            )?.name ?? ''

          const data = result.data.map((d) => ({
            name: lodashResult(d, guessName),
            value: lodashResult(d, guessValue),
          }))

          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              data,
              dataKey: value,
              name: guessName,
              value: guessValue,
            },
          })
        }
      }
    } catch {}
  }

  function handleNameLabelChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        name: value,
      },
    })
  }

  function handleValueLabelChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        value,
      },
    })
  }

  function handleColorChange(color: Color) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        color,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Title
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Help className="ml-1 inline-flex cursor-pointer items-center text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                The title of the bar-list element. Supports Markdown.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          defaultValue={element.props.title}
          onValueChange={handleHeaderChange}
        />
      </div>
      <div>
        <Label htmlFor="data" className="text-xs text-slate-500">
          Data
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="data"
          placeholder="{{ getChartData }}"
          className="font-mono text-xs"
          defaultValue={element.props.dataKey}
          onValueChange={handleDataChange}
        />
      </div>
      <div>
        <Label htmlFor="name" className="text-xs text-slate-500">
          Name
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="name"
          defaultValue={element.props.name}
          onValueChange={handleNameLabelChange}
        />
      </div>
      <div>
        <Label htmlFor="value" className="text-xs text-slate-500">
          Value
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="value"
          defaultValue={element.props.value}
          onValueChange={handleValueLabelChange}
        />
      </div>
      <ColorPicker
        color={element.props.color}
        onColorChange={handleColorChange}
      />
    </div>
  )
}
