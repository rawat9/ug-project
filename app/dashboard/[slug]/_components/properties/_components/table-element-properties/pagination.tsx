import { Switch } from '@/components/ui/switch'
import { NumberInput } from '@tremor/react'

export function Pagination({
  defaultEnablePagination,
  handleEnablePagination,
  handlePageSizeChange,
  pageSizeValue,
}: {
  defaultEnablePagination: boolean
  handleEnablePagination: (checked: boolean) => void
  handlePageSizeChange: (value: number) => void
  pageSizeValue: number
}) {
  return (
    <>
      <h3 className="text-sm font-medium text-slate-500">Pagination</h3>
      <div className="flex items-center justify-between">
        <label className="text-sm" htmlFor="enable-pagination">
          Enable pagination
        </label>
        <Switch
          id="enable-pagination"
          defaultChecked={defaultEnablePagination}
          onCheckedChange={handleEnablePagination}
        />
      </div>
      <div className="mt-1 grid grid-cols-3 items-center gap-4">
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
    </>
  )
}
