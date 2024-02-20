import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { useState } from 'react'
import { NumberInput, TextInput } from '@tremor/react'
import { Add, Eye, EyeOff, Pencil, DragHandle } from '@/icons'
import { Switch } from '@/components/ui/switch'

import { type TableElement } from '../../canvas/types'

export function TableElementProperties({ element }: { element: TableElement }) {
  const { tableHeader, pageSize } = element.props

  const [tableHeaderValue, setTableHeaderValue] = useState(tableHeader)
  const [pageSizeValue, setPageSizeValue] = useState(pageSize)
  const { updateElement } = useCanvasAtom()

  function handleValueChange(value: string) {
    setTableHeaderValue(value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        tableHeader: value,
      },
    })
  }

  function handlePageSizeChange(value: number) {
    setPageSizeValue(value)
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        pageSize: value,
      },
    })
  }

  function handleEnableSorting(value: boolean) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        enableSorting: value,
      },
    })
  }

  function handleEnablePagination(value: boolean) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        enablePagination: value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 px-4">
        <div className="mb-3">
          <Label htmlFor="header" className="text-xs text-slate-500">
            Table header
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="header"
            value={tableHeaderValue}
            onValueChange={handleValueChange}
          />
        </div>
        <div>
          <Label htmlFor="data" className="text-xs text-slate-500">
            Table data
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="data"
            placeholder="{{ getOrders.data }}"
            className="font-mono text-xs placeholder:font-mono"
          />
        </div>
      </div>
      <div className="my-4 h-px bg-gray-200" />
      <div className="flex flex-col gap-2 px-4">
        <div className="mb-1 flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-500">Columns (6)</h4>
          <button type="button" className="text-sm">
            <Add className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 rounded-lg border py-2">
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">first_name</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">last_name</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">age</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">visits</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">status</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-center px-2">
            <DragHandle className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">progress</span>
            <div className="flex gap-2">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="my-3 h-px bg-gray-200" />
      <h3 className="mb-4 px-4 text-sm font-medium text-slate-500">Sorting</h3>
      <div className="flex items-center justify-between px-4">
        <label className="block text-sm" htmlFor="enable-sorting">
          Enable sorting
        </label>
        <Switch
          id="enable-sorting"
          defaultChecked={element.props.enableSorting}
          onCheckedChange={handleEnableSorting}
        />
      </div>
      <div className="my-4 h-px bg-gray-200" />
      <h3 className="mb-4 px-4 text-sm font-medium text-slate-500">
        Pagination
      </h3>
      <div className="flex items-center justify-between px-4">
        <label className="text-sm" htmlFor="enable-pagination">
          Enable pagination
        </label>
        <Switch
          id="enable-pagination"
          defaultChecked={element.props.enablePagination}
          onCheckedChange={handleEnablePagination}
        />
      </div>
      <div className="mt-3 grid grid-cols-3 items-center gap-4 px-4">
        <label htmlFor="pageSize" className="text-sm">
          Page Size
        </label>
        <NumberInput
          autoComplete="off"
          min={10}
          step={10}
          id="pageSize"
          value={pageSizeValue}
          onValueChange={handlePageSizeChange}
          className="col-span-2"
        />
      </div>
    </div>
  )
}
