'use client'

import * as React from 'react'
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  HeaderContext,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EyeOff, CaretSort, CaretUp, CaretDown } from '@/icons'
import { useAtomValue } from 'jotai'
import { selectedTableAtom } from './state'
import { useQuery } from '@tanstack/react-query'
import { fetchTable } from '@/lib/data/server/demo'
import { Skeleton } from '@/components/ui/skeleton'

export function DataTable() {
  const selectedTableName = useAtomValue(selectedTableAtom)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data, isLoading } = useQuery({
    queryKey: ['table', selectedTableName],
    queryFn: () => fetchTable(selectedTableName),
  })

  const columns = React.useMemo(
    () =>
      data?.length
        ? Object.keys(data[0]).map((col) => ({
            accessorKey: col,
            cell: ({ row }: CellContext<any, any>) => row.getValue(col),
            header: ({ column }: HeaderContext<any, any>) => {
              return (
                <Button
                  variant="ghost"
                  className="p-0"
                  onClick={column.getToggleSortingHandler()}
                >
                  <p className="font-semibold">{col}</p>
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
          }))
        : [],
    [data],
  )

  const tableData = React.useMemo(
    () => (isLoading ? Array.from({ length: 50 }).fill({}) : data ?? []),
    [isLoading, data],
  )
  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? Array.from({ length: 12 }).map((_, index) => ({
            id: index.toString(),
            cell: () => <Skeleton className="h-full w-full" />,
          }))
        : columns,
    [isLoading, columns],
  )

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="h-[calc(100vh_-_6rem)] w-full">
      <div className="flex h-[4%] items-center justify-between bg-white px-4">
        <div className="flex items-center gap-2">
          {/* <Button variant="outline" className="h-6" size="sm">
            Insert
          </Button>
          <Button variant="ghost" size="sm">
            <Filter className="mr-1 h-4 w-4" />
            Filter
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <EyeOff className="mr-1 h-4 w-4" />
                Fields
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="relative h-[92%] overflow-auto bg-white">
        <Table className="h-full">
          <TableHeader className="sticky top-0 z-30 bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="border-r px-4">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border-r px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="sticky bottom-0 flex h-9 items-center justify-end space-x-2 px-2">
        <div className="flex-1 text-sm text-slate-500">
          {tableData?.length} rows
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-6 bg-white"
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
            className="h-6 bg-white"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <select
            id="page-size"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            className="bg-slate-50 text-xs text-slate-500 focus:outline-none"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
