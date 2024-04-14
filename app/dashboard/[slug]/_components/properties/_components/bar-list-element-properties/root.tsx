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
import { Select } from '@/components/ui/select'
import toast from 'react-hot-toast'

export function BarListElementProperties({
  element,
}: {
  element: BarListElement
}) {
  const { updateElement } = useCanvasAtom()
  const queries = useAtomValue(queriesAtom)

  function handleTitleChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        title: value,
      },
    })
  }

  function handleDataChange(value: string) {
    if (!queries.length) {
      return toast.error('No queries found')
    }
    const result = lodashResult(lodashKeyBy(queries, 'name'), value) as
      | {
          data: unknown[]
          columns: Column[]
        }
      | undefined

    if (result) {
      if (!result.data) {
        return toast.error('No data found. Please execute the query first.')
      }
      const guessName =
        result.columns.find((col) => col.dtype === 'text')?.name ?? ''

      const guessValue =
        result.columns.find(
          (col) => col.dtype.startsWith('int') || col.dtype.startsWith('float'),
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

  function handleNameChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        name: value,
      },
    })
  }

  function handleValueChange(value: string) {
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
        <Label
          htmlFor="title"
          className="inline-flex items-center text-xs text-slate-500"
        >
          Title
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Help className="ml-1 h-3 w-3 cursor-pointer text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">Supports Markdown.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          defaultValue={element.props.title}
          onValueChange={handleTitleChange}
        />
      </div>
      <div>
        <Label htmlFor="data" className="text-xs text-slate-500">
          Data
        </Label>
        <Select
          defaultValue={element.props.dataKey}
          onValueChange={handleDataChange}
        />
      </div>
      <div>
        <Label
          htmlFor="name"
          className="inline-flex items-center text-xs text-slate-500"
        >
          Name
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Help className="ml-1 h-3 w-3 cursor-pointer text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Must be a string value
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="name"
          defaultValue={element.props.name}
          onValueChange={handleNameChange}
        />
      </div>
      <div>
        <Label
          htmlFor="value"
          className="inline-flex items-center text-xs text-slate-500"
        >
          Value
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Help className="ml-1 h-3 w-3 cursor-pointer text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                Must be an integer value
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="value"
          defaultValue={element.props.value}
          onValueChange={handleValueChange}
        />
      </div>
      <ColorPicker
        color={element.props.color}
        onColorChange={handleColorChange}
      />
    </div>
  )
}
