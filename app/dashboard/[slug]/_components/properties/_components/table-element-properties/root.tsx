import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../../canvas/state'
import * as React from 'react'
import { NumberInput, TextInput } from '@tremor/react'
import {
  Add,
  Eye,
  EyeOff,
  Pencil,
  DragHandle,
  CaretUp,
  CaretDown,
  CaretSort,
} from '@/icons'
import { Switch } from '@/components/ui/switch'
import _ from 'lodash'

import { type TableElement } from '../../../canvas/types'
import { Reorder } from 'framer-motion'
import { ColumnDef, GroupingState } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Grouping } from './grouping'
import { useAtomValue } from 'jotai'
import { editorAtom } from '../../../editor/state'

export function TableElementProperties({ element }: { element: TableElement }) {
  const { tableHeader, pageSize } = element.props
  console.log('rendering table')

  const [tableDataValue, setTableDataValue] = React.useState('')
  const [tableHeaderValue, setTableHeaderValue] = React.useState(tableHeader)
  const [pageSizeValue, setPageSizeValue] = React.useState(pageSize)

  const { updateElement } = useCanvasAtom()
  const [draggable, setDraggable] = React.useState(false)

  const editor = useAtomValue(editorAtom)
  const [columns, setColumns] = React.useState(editor.columns)

  const columnDef: ColumnDef<unknown>[] = React.useMemo(
    () =>
      columns.map((columnName) => ({
        accessorKey: columnName,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0"
              onClick={column.getToggleSortingHandler()}
            >
              <p className="font-semibold">{columnName}</p>
              {column.getCanSort() ? (
                column.getIsSorted() ? (
                  column.getIsSorted() === 'asc' ? (
                    <CaretUp className="ml-1 h-5 w-5" />
                  ) : (
                    <CaretDown className="ml-1 h-5 w-5" />
                  )
                ) : (
                  <CaretSort className="ml-1 h-5 w-5" />
                )
              ) : null}
            </Button>
          )
        },
        // aggregationFn: ,
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue(columnName)}</div>
        ),
      })),
    [columns],
  )

  React.useEffect(() => {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        data: [],
        columns: [],
        state: {
          columnOrder: columns,
          columnSizing: {},
          columnSizingInfo: {
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            isResizingColumn: false,
            columnSizingStart: [],
          },
          rowSelection: {},
          columnPinning: {
            left: [],
            right: [],
          },
          rowPinning: {
            top: [],
            bottom: [],
          },
          columnVisibility: columns.reduce((acc, column) => {
            acc[column] = true
            return acc
          }, {}),
        },
      },
    })
  }, [columns]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleDataChange(value: string) {
    setTableDataValue(value)
    try {
      const interpolate = /{{\s*([^{}]+?)\s*}}/g
      const match = value.match(interpolate)

      if (match) {
        const result = match[0].replace(/{{\s*|\s*}}/g, '')
        const res = _.result(editor, result)
        if (res) {
          // setTableData(res as unknown[])
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              data: res as unknown[],
              columns: columnDef,
            },
          })
        }
      }
    } catch {}
  }

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

  function handleColumnVisibility(column: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        state: {
          ...element.props.state,
          columnVisibility: {
            ...element.props.state.columnVisibility,
            [column]: !element.props.state.columnVisibility[column],
          },
        },
      },
    })
  }

  function handleGroupingChange(column: string[]) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        state: {
          ...element.props.state,
          grouping: column,
        },
      },
    })
  }

  return (
    <div className="flex h-full flex-col gap-1">
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
            value={tableDataValue}
            onValueChange={handleDataChange}
          />
        </div>
      </div>
      <div className="my-4 h-px bg-gray-200" />
      <div className="flex flex-col gap-2 px-4">
        <div className="mb-1 flex items-center justify-between">
          <h4 className="text-sm font-medium text-slate-500">
            Columns ({columns.length})
          </h4>
          <button type="button" className="text-sm">
            <Add className="h-4 w-4" />
          </button>
        </div>
        <Reorder.Group
          axis="y"
          values={columns}
          onReorder={setColumns}
          className="flex flex-col space-y-2 rounded-lg border py-2"
        >
          {columns.map((column) => (
            <Reorder.Item key={column} value={column} dragListener={draggable}>
              <div className="flex items-center justify-center px-2">
                <DragHandle
                  key={column}
                  className="mr-1 h-4 w-4 cursor-grab"
                  onMouseEnter={() => setDraggable(true)}
                  onMouseLeave={() => setDraggable(false)}
                />
                <span className="flex-grow text-sm">{column}</span>
                <div className="flex gap-2">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="cursor-pointer"
                          onClick={() => handleColumnVisibility(column)}
                        >
                          {element.props.state?.columnVisibility?.[column] ? (
                            <Eye className="h-4 w-4 text-gray-400" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        {element.props.state?.columnVisibility?.[column] ? (
                          <p>Hide</p>
                        ) : (
                          <p>Unhide</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Pencil className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
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
      <div className="my-4 h-px bg-gray-200" />
      <Grouping
        columns={columns}
        value={element.props.state?.grouping as GroupingState}
        handleValueChange={handleGroupingChange}
      />
    </div>
  )
}
