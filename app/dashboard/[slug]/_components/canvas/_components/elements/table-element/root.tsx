import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import React, { memo } from 'react'
import type { TableElement } from '../../../types'
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  GroupingState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Filters } from './filters'
import {
  CaretDown,
  CaretSort,
  CaretUp,
  ChevronDown,
  ChevronRight,
} from '@/icons'

const TableElement = memo(({ element }: { element: TableElement }) => {
  const data = element.props.data
  const columns = element.props.columns

  const columnDef: ColumnDef<unknown>[] = React.useMemo(
    () =>
      columns.map((col) => ({
        id: col.name,
        accessorKey: col.name,
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="p-0"
              onClick={column.getToggleSortingHandler()}
            >
              <p className="font-semibold">{col.name}</p>
              {column.getCanSort() &&
                (column.getIsSorted() ? (
                  column.getIsSorted() === 'asc' ? (
                    <CaretUp className="ml-1 h-5 w-5" />
                  ) : (
                    <CaretDown className="ml-1 h-5 w-5" />
                  )
                ) : (
                  <CaretSort className="ml-1 h-5 w-5" />
                ))}
            </Button>
          )
        },
        aggregationFn: () => col.aggregationFn,
        // aggregationFn: (columnId) => {
        //   const values = element.props.aggregatedValues
        //   const value = values.find((v) => v.column.name === columnId)
        //   console.log(value?.aggFn)
        //   return value?.aggFn
        // },
        aggregatedCell: ({ row }) => (
          <div className="font-medium">{row.getValue(col.name)}</div>
        ),
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue(col.name)}</div>
        ),
      })),
    [columns],
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  })

  table.setOptions((options) => ({
    ...options,
    state: {
      sorting,
      pagination,
      columnFilters,
      grouping,
      expanded,
      ...element.props.state,
    },
    onExpandedChange: setExpanded,
    onGroupingChange: setGrouping,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: data && data.length,
    enableSorting: element.props.enableSorting,
  }))

  return (
    <Card className="flex h-full w-full flex-col gap-6">
      <div className="flex items-center">
        <h3 className="flex-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {element.props.tableHeader}
        </h3>
        <Filters />
      </div>

      {!table || !data.length || !columns.length ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-slate-500">No data to display</p>
        </div>
      ) : (
        <>
          <Table
            style={{ height: '100%' }}
            className="h-full overflow-auto rounded-md border bg-white"
          >
            <TableHead className="sticky top-0 z-30 bg-slate-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b-2">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHeaderCell
                        key={header.id}
                        className="border-r px-2 py-1 text-dark-tremor-content last:border-r-0"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHeaderCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-slate-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r px-2 py-1 last:border-r-0"
                    >
                      {cell.getIsGrouped() ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: {
                                cursor: row.getCanExpand()
                                  ? 'pointer'
                                  : 'normal',
                              },
                            }}
                            className="flex items-center gap-2"
                          >
                            {row.getIsExpanded() ? (
                              <ChevronDown />
                            ) : (
                              <ChevronRight />
                            )}
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}{' '}
                            ({row.subRows.length})
                          </button>
                        </>
                      ) : cell.getIsAggregated() ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        flexRender(
                          cell.column.columnDef.aggregatedCell ??
                            cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      ) : cell.getIsPlaceholder() ? null : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex h-[4%] items-center justify-end space-x-2 px-2">
            <div className="flex-1 text-sm text-slate-500">
              {'Showing ' +
                table?.getPaginationRowModel().rows.length +
                ' of ' +
                data.length +
                ' rows'}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-6"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <p className="text-xs">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="h-6"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
})

TableElement.displayName = 'TableElement'

export { TableElement }
