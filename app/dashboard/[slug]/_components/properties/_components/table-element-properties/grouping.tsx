import { Switch } from '@/components/ui/switch'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import * as React from 'react'

export function Grouping({
  columns,
  value,
  handleValueChange,
}: {
  columns: string[]
  value: string[]
  handleValueChange: (value: string[]) => void
}) {
  return (
    <>
      <h3 className="mb-4 px-4 text-sm font-medium text-slate-500">Grouping</h3>
      <div className="mb-6 flex items-center justify-between px-4">
        <label className="text-sm" htmlFor="enable-grouping">
          Enable grouping
        </label>
        <Switch
          id="enable-grouping"
          defaultChecked={false}
          onCheckedChange={() => {}}
        />
      </div>
      <div className="mb-4 flex flex-col gap-2 px-4">
        <h3 className="text-sm font-medium text-slate-500">Row groups</h3>
        <MultiSelect value={value} onValueChange={handleValueChange}>
          {columns.map((column) => (
            <MultiSelectItem key={column} value={column} />
          ))}
        </MultiSelect>
        <div className="flex h-20 items-center justify-center rounded-lg border border-dashed bg-neutral-50">
          <p className="text-sm text-slate-400">Drag here to set row groups</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <h3 className="text-sm font-medium text-slate-500">Values</h3>
        <div className="flex h-20 items-center justify-center rounded-lg border border-dashed bg-neutral-50">
          <p className="text-sm text-slate-400">Drag here to aggregate</p>
        </div>
      </div>
    </>
  )
}
