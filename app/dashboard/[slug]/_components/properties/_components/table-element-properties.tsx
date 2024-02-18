import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { useState } from 'react'
import { TextInput } from '@tremor/react'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Add, Eye, EyeOff, Pencil } from '@/icons'
import { Percentage } from '@/icons/Percentage'

import { type TableElement } from '../../canvas/types'

export function TableElementProperties({ element }: { element: TableElement }) {
  const { name } = element.props

  const [value, setValue] = useState(name)
  const { updateElement } = useCanvasAtom()

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
      <div className="flex flex-col gap-2 px-4">
        <div className="mb-3">
          <Label htmlFor="header" className="text-xs text-slate-500">
            Table header
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="value"
            value={value}
            onChange={handleValueChange}
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
      <div className="my-4 h-px bg-gray-300" />
      <div className="flex flex-col gap-2 px-4">
        <div className="mt-2 flex items-center justify-between">
          <h4 className="text-sm font-semibold tracking-wide text-gray-600">
            Columns (6)
          </h4>
          <button type="button" className="text-sm">
            <Add className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 rounded-lg border py-2">
          <div className="flex items-center justify-between px-2">
            <span className="flex-grow text-sm">first_name</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between px-2">
            <span className="flex-grow pl-2 text-sm">last_name</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between px-2">
            <span className="flex-grow pl-2 text-sm">age</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between px-2">
            <span className="flex-grow text-sm">visits</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between px-2">
            <span className="flex-grow text-sm">status</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex items-center justify-between px-2">
            <Percentage className="mr-1 h-4 w-4" />
            <span className="flex-grow text-sm">progress</span>
            <div className="flex gap-1">
              <Eye className="h-4 w-4" />
              <Pencil className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-2 block text-sm font-semibold" htmlFor="sort-by">
          Default column to sort by
        </label>
        <Select>
          <SelectTrigger id="sort-by">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="ascending">Ascending</SelectItem>
            <SelectItem value="descending">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
