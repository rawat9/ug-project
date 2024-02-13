import {
  Card,
  // Table,
  // TableBody,
  // TableCell,
  // TableHead,
  // TableHeaderCell,
  // TableRow,
} from '@tremor/react'
import { memo, useState } from 'react'
import { Element } from '../../types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Payment } from '@/app/integrations/app-db/_components/data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CaretDown, CaretSort, CaretUp, Filter } from '@/icons'

type Row = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: string
}

const data: Row[] = [
  {
    firstName: 'Marcella',
    lastName: 'Muller',
    age: 28,
    visits: 93,
    status: 'relationship',
    progress: '100%',
  },
  {
    firstName: 'Dortha',
    lastName: 'Crist',
    age: 35,
    visits: 66,
    status: 'complicated',
    progress: '67%',
  },
  {
    firstName: 'Eldon',
    lastName: 'Hane',
    age: 23,
    visits: 800,
    status: 'complicated',
    progress: '92%',
  },
  {
    firstName: 'Justen',
    lastName: 'Larkin',
    age: 18,
    visits: 647,
    status: 'single',
    progress: '75%',
  },
  {
    firstName: 'Nellie',
    lastName: 'Zieme',
    age: 34,
    visits: 958,
    status: 'relationship',
    progress: '60%',
  },
  {
    firstName: 'Mikel',
    lastName: 'Grant',
    age: 31,
    visits: 860,
    status: 'relationship',
    progress: '71%',
  },
  {
    firstName: 'Abigayle',
    lastName: 'Barrows',
    age: 22,
    visits: 89,
    status: 'relationship',
    progress: '53%',
  },
  {
    firstName: 'Favian',
    lastName: 'Hagenes',
    age: 26,
    visits: 783,
    status: 'complicated',
    progress: '39%',
  },
  {
    firstName: 'Sigrid',
    lastName: 'Windler',
    age: 22,
    visits: 863,
    status: 'relationship',
    progress: '43%',
  },
  {
    firstName: 'Zackary',
    lastName: 'Casper',
    age: 2,
    visits: 88,
    status: 'relationship',
    progress: '34%',
  },
  {
    firstName: 'Kathlyn',
    lastName: 'Koss',
    age: 29,
    visits: 1000,
    status: 'single',
    progress: '100%',
  },
  {
    firstName: 'Laurie',
    lastName: 'Kerluke',
    age: 21,
    visits: 190,
    status: 'single',
    progress: '10%',
  },
]

const columns: ColumnDef<Row>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'firstName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
          className="p-0"
        >
          <p className="font-semibold">first_name</p>
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? (
              <CaretUp className="ml-1 h-5 w-5" />
            ) : (
              <CaretDown className="ml-1 h-5 w-5" />
            )
          ) : (
            <CaretSort className="ml-1 h-5 w-5" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('firstName')}</div>
    ),
  },
  {
    accessorKey: 'lastName',
    header: () => <p className="font-semibold">last_name</p>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('lastName')}</div>
    ),
  },
  {
    accessorKey: 'age',
    header: () => <p className="font-semibold">age</p>,
    cell: ({ row }) => <div>{row.getValue('age')}</div>,
  },
  {
    accessorKey: 'visits',
    header: () => <p className="font-semibold">visits</p>,
    cell: ({ row }) => <div>{row.getValue('visits')}</div>,
    aggregationFn: 'sum',
  },
  {
    accessorKey: 'status',
    header: () => <p className="font-semibold">status</p>,
    cell: ({ row }) => <div>{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'progress',
    header: () => <div className="font-medium">progress</div>,
    cell: ({ row }) => <div>{row.getValue('progress')}</div>,
  },
]

const TableElement = memo(({ element }: { element: Element }) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    debugTable: true,
  })

  return (
    <Card className="flex h-full w-full flex-col gap-6">
      <div className="flex items-center">
        <h3 className="flex-1 font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          List of something
        </h3>
        <Button variant="outline" className="h-8">
          <Filter className="mr-1 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="h-full overflow-auto rounded-md border bg-white">
        <Table>
          <TableHeader className="sticky top-0 z-30 bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-4">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-11 border-r last:border-r-0"
                    >
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
                    <TableCell
                      key={cell.id}
                      className="border-b border-r last:border-r-0"
                    >
                      {cell.getIsPlaceholder()
                        ? null
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex h-[4%] items-center justify-end space-x-2 px-2">
        <div className="flex-1 text-sm text-slate-500">
          {/* {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected. */}
          {'Showing ' +
            table.getPaginationRowModel().rows.length +
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
    </Card>
  )
})

TableElement.displayName = 'TableElement'

export { TableElement }
