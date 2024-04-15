import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableFoot,
  TableFooterCell,
  TableRow,
} from '@tremor/react'
import React, { memo } from 'react'
import type { TableElement } from '../../../types'
import {
  ColumnDef,
  ExpandedState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
// import { Filters } from './filters'
import {
  CaretDown,
  CaretSort,
  CaretUp,
  ChevronDown,
  ChevronRight,
} from '@/icons'
import { EmptyDataState } from '../empty-state'
import { cn, isNumberType } from '@/lib/utils'

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
        aggregationFn: 'auto',
        aggregatedCell: ({ row }) => (
          <div className="font-medium">{row.getValue(col.name)}</div>
        ),
        cell: ({ row }) => (
          <div
            className={cn(
              'capitalize',
              isNumberType(col.dtype) ? 'text-right' : 'text-left',
            )}
          >
            {row.getValue(col.name)}
          </div>
        ),
        footer: ({ table }) => {
          if (!isNumberType(col.dtype)) {
            return null
          }

          const total = table
            .getFilteredRowModel()
            .rows.reduce((total, row) => {
              return total + Number(row.getValue(col.name))
            }, 0)

          return (
            <div className="flex justify-between">
              Total:
              <span>{Math.round(total * 100) / 100}</span>
            </div>
          )
        },
      })),
    [columns],
  )

  const [expanded, setExpanded] = React.useState<ExpandedState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  React.useEffect(() => {
    if (element.props.pageSize) {
      setPagination((prev) => ({
        ...prev,
        pageSize: element.props.pageSize,
      }))
    }
  }, [element.props.pageSize])

  React.useEffect(() => {
    if (!element.props.enablePagination) {
      setPagination((prev) => ({
        ...prev,
        pageSize: data.length,
      }))
    } else {
      setPagination((prev) => ({
        ...prev,
        pageSize: 10,
      }))
    }
  }, [element.props.enablePagination, data.length])

  const table = useReactTable({
    data,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
  })

  table.setOptions((options) => ({
    ...options,
    state: {
      sorting,
      pagination,
      expanded,
      ...element.props.state,
    },
    onExpandedChange: setExpanded,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableSorting: element.props.enableSorting,
    enableGrouping: element.props.enableGrouping,
  }))

  return (
    <Card className="flex h-full w-full flex-col gap-6">
      <div className="flex items-center">
        <h3 className="flex-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {element.props.title}
        </h3>
        {/* <Filters /> */}
      </div>

      {!table || !data.length || !columns.length ? (
        <EmptyDataState />
      ) : (
        <>
          <Table
            style={{
              height: '100%',
            }}
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
            <TableFoot className="sticky bottom-0 z-30 border-t">
              {table.getFooterGroups().map((footerGroups) => (
                <TableRow className="bg-neutral-50" key={footerGroups.id}>
                  {footerGroups.headers.map((footer) => (
                    <TableFooterCell
                      key={footer.id}
                      className="px-2 py-1"
                      style={{
                        minWidth: footer.column.getSize(),
                      }}
                    >
                      {footer.isPlaceholder
                        ? null
                        : flexRender(
                            footer.column.columnDef.footer,
                            footer.getContext(),
                          )}
                    </TableFooterCell>
                  ))}
                </TableRow>
              ))}
            </TableFoot>
          </Table>
          {element.props.enablePagination && (
            <div className="flex h-[4%] items-center justify-end space-x-2">
              <div className="flex-1 text-xs text-slate-600">
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
                <p className="text-xs text-slate-600">
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
          )}
        </>
      )}
    </Card>
  )
})

TableElement.displayName = 'TableElement'

export { TableElement }
