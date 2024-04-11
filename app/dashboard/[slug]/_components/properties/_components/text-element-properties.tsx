'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { TextElement } from '../../canvas/types'
import {
  TabGroup,
  TabList,
  Tab,
  TextInput,
  Textarea,
  Color,
  NumberInput,
} from '@tremor/react'
import {
  AlignBottom,
  AlignCenter,
  AlignMiddle,
  AlignLeft,
  AlignRight,
  AlignTop,
  Cross,
} from '@/icons'
import { useMemo, useState } from 'react'
import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn, colors, getColor } from '@/lib/utils'

export function TextElementProperties({ element }: { element: TextElement }) {
  const { updateElement } = useCanvasAtom()
  const [isOpen, setIsOpen] = useState(false)
  const alignment = useMemo(() => ['start', 'center', 'end'], [])
  const { elements } = useCanvasAtom()

  function handleValueChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        rawValue: value,
        displayValue: value,
      },
    })
    try {
      const interpolate = /{{\s*([^{}]+?)\s*}}/g
      const match = value.match(interpolate)

      if (match) {
        const result = lodashResult(
          lodashKeyBy(elements, 'name'),
          match[0].replace(/{{\s*|\s*}}/g, ''),
        ) as string | number | undefined

        if (result) {
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              rawValue: value,
              displayValue: value.replace(match[0], result.toString()),
            },
          })
        }
      }
    } catch {}
  }

  function handleJustifyAlignmentChange(index: number) {
    const value = alignment[index] as 'start' | 'center' | 'end'
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        alignment: {
          ...element.props.alignment,
          justify: value,
        },
      },
    })
  }

  function handleItemsAlignmentChange(index: number) {
    const value = alignment[index] as 'start' | 'center' | 'end'
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        alignment: {
          ...element.props.alignment,
          items: value,
        },
      },
    })
  }

  function handleTypeChange(index: number) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        type: index === 0 ? 'plaintext' : 'markdown',
      },
    })
  }

  function handleColorChange(color: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        color,
      },
    })
  }

  function handleFontSizeChange(fontSize: number) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        fontSize,
      },
    })
  }

  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="space-y-1">
        <div className="flex items-end">
          <Label htmlFor="title" className="text-xs text-slate-500">
            Title
          </Label>
          <TabGroup
            className="mb-2 flex justify-end"
            index={element.props.type === 'plaintext' ? 0 : 1}
            onIndexChange={handleTypeChange}
          >
            <TabList variant="solid">
              <Tab className="px-1 text-xs ui-selected:text-slate-700">
                Plain text
              </Tab>
              <Tab className="px-1 text-xs ui-selected:text-slate-700">
                Markdown
              </Tab>
            </TabList>
          </TabGroup>
        </div>
        {element.props.type === 'plaintext' ? (
          <TextInput
            type="text"
            autoComplete="off"
            id="title"
            value={element.props.rawValue}
            onValueChange={handleValueChange}
          />
        ) : (
          <Textarea
            autoComplete="off"
            id="title"
            value={element.props.rawValue}
            onValueChange={handleValueChange}
            className="resize-none"
            autoHeight
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">Alignment</p>
        <div className="flex w-full items-center gap-3">
          <TabGroup
            onIndexChange={handleJustifyAlignmentChange}
            defaultIndex={alignment.indexOf(element.props.alignment.justify)}
          >
            <TabList variant="solid" className="w-full">
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignLeft className="h-4 w-4" />
              </Tab>
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignCenter className="h-4 w-4" />
              </Tab>
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignRight className="h-4 w-4" />
              </Tab>
            </TabList>
          </TabGroup>
          <TabGroup
            onIndexChange={handleItemsAlignmentChange}
            defaultIndex={alignment.indexOf(element.props.alignment.items)}
          >
            <TabList variant="solid" className="w-full">
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignTop className="h-4 w-4" />
              </Tab>
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignMiddle className="h-4 w-4" />
              </Tab>
              <Tab className="w-full justify-center ui-selected:text-slate-700">
                <AlignBottom className="h-4 w-4" />
              </Tab>
            </TabList>
          </TabGroup>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor='font-size'className="text-xs text-slate-500">Font size</Label>
        <NumberInput id="font-size" value={element.props.fontSize} onValueChange={handleFontSizeChange} />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">Color</p>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex h-12 w-full cursor-pointer items-center gap-2 rounded-md border border-slate-100 bg-gray-50 p-2">
              <div
                className={`h-7 w-7 rounded-md bg-${[element.props.color]}-500 opacity-80`}
              />
              <div>
                <p className="text-sm text-slate-800">{element.props.color}</p>
                <p className="text-xs text-slate-400">
                  {getColor(element.props.color as Color)}
                </p>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            onInteractOutside={(e) => e.preventDefault()}
            alignOffset={-300}
            align="start"
            className="z-10 max-h-60 -translate-x-6 -translate-y-9"
          >
            <div className="flex items-center justify-between pb-4">
              <p className="flex-1 text-sm text-slate-500">Colors</p>
              <button onClick={() => setIsOpen(false)}>
                <Cross />
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-8 w-full rounded-md py-1 shadow-md',
                    `bg-${color}-500`,
                  )}
                  onClick={() => handleColorChange(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
