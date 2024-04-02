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

export function TextElementProperties({ element }: { element: TextElement }) {
  const { updateElement } = useCanvasAtom()
  const alignment = useMemo(() => ['start', 'center', 'end'], [])

  function handleValueChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        value,
      },
    })
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
    // <div className="flex flex-col gap-1">
    //   <div className="px-4">
    //     <Label htmlFor="value" className="text-xs text-slate-500">
    //       Value
    //     </Label>
    //     <TextInput
    //       type="text"
    //       autoComplete="off"
    //       id="value"
    //       value={element.props.value}
    //       onValueChange={handleValueChange}
    //     />
    //   </div>
    //   <div className="my-4 h-px w-full bg-gray-200" />
    //   {/* <div className="p-2 text-sm text-gray-500">Alignment</div>
    //   <div className="flex justify-between px-4">
    //     <div id="justifyContent">
    //       <RadioGroup
    //         className="flex gap-1"
    //         onValueChange={handleJustifyAlignmentChange}
    //         defaultValue={element.props.alignment.justify}
    //       >
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="justify-start"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="justify-start"
    //             value="start"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignLeft className="h-6 w-6" />
    //           </div>
    //         </Label>
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="justify-center"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="justify-center"
    //             value="center"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignCenter className="h-6 w-6" />
    //           </div>
    //         </Label>
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="justify-end"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="justify-end"
    //             value="end"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignRight className="h-6 w-6" />
    //           </div>
    //         </Label>
    //       </RadioGroup>
    //     </div>
    //     <div id="alignItems">
    //       <RadioGroup
    //         className="flex gap-1"
    //         onValueChange={handleItemsAlignmentChange}
    //         defaultValue={element.props.alignment.items}
    //       >
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="align-start"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="align-start"
    //             value="start"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignTop className="h-6 w-6" />
    //           </div>
    //         </Label>
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="align-center"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="align-center"
    //             value="center"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignMiddle className="h-6 w-6" />
    //           </div>
    //         </Label>
    //         <Label
    //           className="flex h-8 w-8 cursor-pointer flex-col items-center gap-2"
    //           htmlFor="align-end"
    //         >
    //           <RadioGroupItem
    //             className="peer sr-only"
    //             id="align-end"
    //             value="end"
    //           />
    //           <div className="flex w-full flex-1 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm ring-1 ring-transparent transition-colors peer-aria-checked:border-gray-400 peer-aria-checked:text-gray-900 peer-aria-checked:ring-gray-100 dark:border-gray-500 dark:text-gray-400 dark:peer-aria-checked:border-gray-50 dark:peer-aria-checked:text-gray-50 dark:peer-aria-checked:ring-gray-50">
    //             <AlignBottom className="h-6 w-6" />
    //           </div>
    //         </Label>
    //       </RadioGroup>
    //     </div>
    //   </div> */}
    // </div>
    <div className="flex flex-col gap-4 px-4">
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          defaultValue={element.props.value}
          onValueChange={handleValueChange}
        />
      </div>
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Text align
        </Label>
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
        <Label htmlFor="title" className="text-xs text-slate-500">
          Vertical align
        </Label>
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
