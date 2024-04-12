'use client'

import { Delete, ExpandRight, Pencil, Selection } from '@/icons'
import { useCanvasAtom } from '../canvas/state'
import * as React from 'react'

import { type Element } from '../canvas/types'
import { ExpandLeft } from '@/icons'

import { TextElementProperties } from './_components/text-element-properties'
import { TableElementProperties } from './_components/table-element-properties/root'
import { LineChartElementProperties } from './_components/line-chart-element-properties'
import { BarChartElementProperties } from './_components/bar-chart-element-properties'
import { BarListElementProperties } from './_components/bar-list-element-properties'

export function Properties() {
  const { selectedElement, setSelectedElement, removeElement } = useCanvasAtom()
  const [expanded, setExpanded] = React.useState(false)

  React.useEffect(() => {
    if (selectedElement) {
      setExpanded(true)
    } else {
      setExpanded(false)
    }
  }, [selectedElement])

  function handleRemove() {
    if (selectedElement) {
      removeElement(selectedElement.id)
      setSelectedElement(null)
    }
  }

  function handleRename() {
    if (selectedElement) {
      console.log('rename')
    }
  }

  return (
    <>
      {expanded ? (
        <div className="absolute right-4 top-4 z-50 block h-[550px] w-[300px] rounded-lg bg-white shadow-md">
          <div className="flex h-9 items-center p-2">
            {selectedElement ? (
              <>
                <div className="flex-1">{selectedElement.name}</div>
                <button onClick={handleRemove}>
                  <Delete className="mr-1 h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex-1 text-sm text-slate-500">
                No element selected
              </div>
            )}
            <button onClick={() => setExpanded(false)}>
              <ExpandRight className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
          <div className="h-px w-full bg-gray-200" />
          <div className="h-[95%] py-4">
            <div className="h-full overflow-y-auto">
              <BaseProperties element={selectedElement} />
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute right-4 top-4 z-50 flex h-9 w-28 items-center rounded-md bg-white px-2 shadow-md">
          <p className="flex-1 text-sm text-slate-500">Properties</p>
          <button onClick={() => setExpanded(true)}>
            <ExpandLeft className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      )}
    </>
  )
}

function BaseProperties({ element }: { element: Element | null }) {
  if (!element) {
    return (
      <div className="flex h-[90%] w-full flex-col items-center justify-center p-2 pb-4 text-gray-400">
        <Selection className="my-4 h-12 w-12" />
        <p className="text-center">Select an element to edit its properties</p>
      </div>
    )
  }

  switch (element.type) {
    case 'text':
      return <TextElementProperties element={element} />
    case 'table':
      return <TableElementProperties element={element} />
    case 'card':
      return <div>Card properties</div>
    case 'area-chart':
      return <div>Area chart properties</div>
    case 'line-chart':
      return <LineChartElementProperties element={element} />
    case 'bar-chart':
      return <BarChartElementProperties element={element} />
    case 'bar-list':
      return <BarListElementProperties element={element} />
    default:
      throw new Error('Invalid type')
  }
}
