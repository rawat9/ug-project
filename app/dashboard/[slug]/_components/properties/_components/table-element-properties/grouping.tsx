import { Switch } from '@/components/ui/switch'
import { Add, Check } from '@/icons'
import { Column } from '@/types'
import { Listbox, Transition } from '@headlessui/react'
import type { GroupingState } from '@tanstack/react-table'
import * as React from 'react'

export function Grouping({
  columns,
  groups,
  handleGroupingChange,
  enableGrouping,
  handleEnableGroupingChange,
}: {
  columns: string[]
  groups: GroupingState
  handleGroupingChange: (value: GroupingState) => void
  enableGrouping: boolean
  handleEnableGroupingChange: (value: boolean) => void
}) {
  return (
    <>
      <h3 className="text-sm font-medium text-slate-500">Grouping</h3>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm" htmlFor="enable-grouping">
          Enable grouping
        </label>
        <Switch
          id="enable-grouping"
          defaultChecked={enableGrouping}
          onCheckedChange={handleEnableGroupingChange}
        />
      </div>
      <div className="mb-1 flex flex-col gap-2">
        <div className="flex items-center">
          <h3 className="flex-1 text-sm font-medium text-slate-500">
            Row groups
          </h3>
          <Listbox value={groups} onChange={handleGroupingChange} multiple>
            <div className="mt-1">
              <Listbox.Button>
                <Add className="h-4 w-4" />
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute -left-2 top-64 z-10 mt-1 max-h-60 w-auto -translate-x-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {columns.map((col, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-amber-100 text-amber-900'
                            : 'text-gray-900'
                        }`
                      }
                      value={col}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {col}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="flex flex-col gap-1 rounded-lg border border-dashed bg-neutral-50 p-2">
          {!groups.length ? (
            <p className="text-center align-bottom text-sm text-slate-400">
              Add fields here to group
            </p>
          ) : (
            groups.map((group) => (
              <div
                key={group}
                className="flex w-full items-center rounded-md border bg-neutral-100 px-2 py-1"
              >
                <p className="flex-1 text-sm text-slate-500">{group}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
