'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { TextElement } from '../../canvas/types'
import { TabGroup, TabList, Tab, TextInput } from '@tremor/react'
import {
  AlignBottom,
  AlignCenter,
  AlignMiddle,
  AlignLeft,
  AlignRight,
  AlignTop,
} from '@/icons'
import { useMemo } from 'react'
import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'

export function TextElementProperties({ element }: { element: TextElement }) {
  const { updateElement } = useCanvasAtom()
  const alignment = useMemo(() => ['start', 'center', 'end'], [])
  const { elements } = useCanvasAtom()

  function handleValueChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        value,
      },
    })
    try {
      const interpolate = /{{\s*([^{}]+?)\s*}}/g
      const match = value.match(interpolate)

      if (match) {
        const result = lodashResult(
          lodashKeyBy(elements, 'name'),
          match[0].replace(/{{\s*|\s*}}/g, ''),
        ) as string | undefined

        if (typeof result === 'object') {
          return
        }

        if (result) {
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              value,
              dynamicValue: result,
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

  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          value={element.props.value}
          onValueChange={handleValueChange}
        />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">Text align</p>
        <TabGroup onIndexChange={handleJustifyAlignmentChange}>
          <TabList variant="solid" className="w-full">
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignLeft className="h-6 w-6" />
            </Tab>
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignCenter className="h-6 w-6" />
            </Tab>
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignRight className="h-6 w-6" />
            </Tab>
          </TabList>
        </TabGroup>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">Vertical align</p>
        <TabGroup
          onIndexChange={handleItemsAlignmentChange}
          // defaultIndex={element.props.alignment.items}
        >
          <TabList variant="solid" className="w-full">
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignTop className="h-6 w-6" />
            </Tab>
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignMiddle className="h-6 w-6" />
            </Tab>
            <Tab className="w-full justify-center ui-selected:text-slate-700">
              <AlignBottom className="h-6 w-6" />
            </Tab>
          </TabList>
        </TabGroup>
      </div>
    </div>
  )
}
