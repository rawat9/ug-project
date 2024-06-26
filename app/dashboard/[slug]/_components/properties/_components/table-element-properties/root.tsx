import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../../canvas/state'
import * as React from 'react'
import { TextInput } from '@tremor/react'
import { Switch } from '@/components/ui/switch'
import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'
import lodashIsEqual from 'lodash/isEqual'

import { type TableElement } from '../../../canvas/types'
import { Grouping } from './grouping'
import { Columns } from './columns'
import { Pagination } from './pagination'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../../editor/state'
import { Column } from '@/types'
import toast from 'react-hot-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function TableElementProperties({ element }: { element: TableElement }) {
  const { updateElement } = useCanvasAtom()

  const queries = useAtomValue(queriesAtom)
  const [columns, setColumns] = React.useState(
    element.props.columns.map((c) => c.name),
  )

  React.useEffect(() => {
    const query = queries.find((query) => query.name === element.props.dataKey)

    if (query) {
      if (!query.data) {
        return
      }

      if (!query.columns) {
        return
      }

      // check if query data is equal to the current data
      if (lodashIsEqual(element.props.data, query.data)) {
        return
      }

      updateElement(element.id, {
        ...element,
        props: {
          ...element.props,
          data: query.data,
          columns: query.columns,
          dataKey: query.name,
          state: {
            ...element.props.state,
            columnVisibility: query.columns.reduce(
              (acc, column) => ({
                ...acc,
                [column.name]: true,
              }),
              {},
            ),
          },
        },
      })
      setColumns(query.columns.map((c) => c.name))
    }
  }, [queries]) // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        state: {
          columnOrder: columns,
          columnSizing: {},
          grouping: element.props.state?.grouping || [],
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
          columnVisibility: element.props.state?.columnVisibility,
        },
      },
    })
  }, [element.props.columns]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDataChange = (value: string) => {
    if (!queries.length) {
      return toast.error('No queries found')
    }
    const result = lodashResult(lodashKeyBy(queries, 'name'), value) as
      | {
          data: unknown[]
          columns: Column[]
        }
      | undefined

    if (result) {
      if (!result.data) {
        return toast.error('No data found. Please execute the query first.')
      }

      updateElement(element.id, {
        ...element,
        props: {
          ...element.props,
          data: result.data,
          columns: result.columns,
          dataKey: value,
          state: {
            ...element.props.state,
            columnVisibility: result.columns.reduce(
              (acc, column) => ({
                ...acc,
                [column.name]: true,
              }),
              {},
            ),
          },
        },
      })
      setColumns(result.columns.map((c) => c.name))
    }
  }

  function handleValueChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        title: value,
      },
    })
  }

  function handlePageSizeChange(value: number) {
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

  function handleEnableGrouping(value: boolean) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        enableGrouping: value,
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
            [column]: !element.props.state?.columnVisibility?.[column],
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
    <div className="flex flex-col gap-6 px-4 pb-4">
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          value={element.props.title}
          onValueChange={handleValueChange}
        />
      </div>
      <div>
        <Label htmlFor="data" className="text-xs text-slate-500">
          Data
        </Label>
        <Select
          defaultValue={element.props.dataKey}
          onValueChange={handleDataChange}
        >
          <SelectTrigger id="data">
            <SelectValue placeholder="getData" className="font-mono text-xs">
              {element.props.dataKey}
            </SelectValue>
          </SelectTrigger>
          {queries.length > 0 && (
            <SelectContent
              alignOffset={-300}
              align="start"
              className="z-10 max-h-60 -translate-x-6"
            >
              {queries.map((query) => (
                <SelectItem key={query.name} value={query.name}>
                  {query.name}
                </SelectItem>
              ))}
            </SelectContent>
          )}
        </Select>
      </div>
      <Columns
        columns={columns}
        setCols={setColumns}
        columnVisibility={element.props.state?.columnVisibility}
        handleColumnVisibility={handleColumnVisibility}
      />
      <h3 className="text-sm font-medium text-slate-500">Sorting</h3>
      <div className="flex items-center justify-between">
        <label className="block text-sm" htmlFor="enable-sorting">
          Enable sorting
        </label>
        <Switch
          id="enable-sorting"
          defaultChecked={element.props.enableSorting}
          onCheckedChange={handleEnableSorting}
        />
      </div>
      <Pagination
        defaultEnablePagination={element.props.enablePagination}
        handleEnablePagination={handleEnablePagination}
        pageSizeValue={element.props.pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
      <Grouping
        columns={columns}
        groups={element.props.state?.grouping ?? []}
        handleGroupingChange={handleGroupingChange}
        enableGrouping={element.props.enableGrouping}
        handleEnableGroupingChange={handleEnableGrouping}
      />
    </div>
  )
}
