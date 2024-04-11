import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../../canvas/state'
import * as React from 'react'
import { TextInput } from '@tremor/react'
import { Switch } from '@/components/ui/switch'
import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'

import { type TableElement } from '../../../canvas/types'
import { VisibilityState } from '@tanstack/react-table'
import { Grouping } from './grouping'
import { Columns } from './columns'
import { Pagination } from './pagination'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../../editor/state'
import { Column } from '@/types'

export function TableElementProperties({ element }: { element: TableElement }) {
  const { tableHeader, pageSize } = element.props

  const [tableHeaderValue, setTableHeaderValue] = React.useState(tableHeader)
  const [pageSizeValue, setPageSizeValue] = React.useState(pageSize)

  const { updateElement } = useCanvasAtom()

  const queries = useAtomValue(queriesAtom)
  const [columns, setColumns] = React.useState(
    element.props.columns.map((c) => c.name),
  )

  React.useEffect(() => {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
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
          columnVisibility: columns.reduce<VisibilityState>((acc, column) => {
            acc[column] = true
            return acc
          }, {}),
        },
      },
    })
  }, [columns]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleDataChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        dataSource: value,
      },
    })
    try {
      const interpolate = /{{\s*([^{}]+?)\s*}}/g
      const match = value.match(interpolate)

      if (match) {
        const result = lodashResult(
          lodashKeyBy(queries, 'name'),
          match[0].replace(/{{\s*|\s*}}/g, ''),
        ) as
          | {
              data: unknown[]
              columns: Column[]
            }
          | undefined

        if (result) {
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              data: result.data,
              columns: result.columns,
              dataSource: value,
            },
          })
          setColumns(result.columns.map((c) => c.name))
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

  // function handleAggregatedValuesChange(value: Column[]) {
  //   setColumns((prev) => {
  //     return prev.map((col) => {
  //       if (value.find((v) => v.name === col)) {
  //         return {
  //           aggregationFn: value.find((v) => v.name === col)?.aggregationFn,
  //         }
  //       }
  //       return col
  //     })
  //   })

  // updateElement(element.id, {
  //   ...element,
  //   props: {
  //     ...element.props,
  //     columns:
  //     // aggregatedValues: value.map((v) => {
  //     //   return {
  //     //     column: v,
  //     //     aggFn: () => {
  //     //       if (v.dtype === 'text') {
  //     //         return aggregationFns['count']
  //     //       }
  //     //       if (v.dtype.startsWith('int')) {
  //     //         return aggregationFns['sum']
  //     //       }
  //     //       return 0
  //     //       // return aggregationFns['count']
  //     //     },
  //     //   }
  //     // }),
  //   },
  // })
  // }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-2 px-4">
        <div className="mb-3">
          <Label htmlFor="header" className="text-xs text-slate-500">
            Title
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
          <Label htmlFor="data-source" className="text-xs text-slate-500">
            Data
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="data-source"
            placeholder="{{ getData }}"
            className="font-mono text-xs placeholder:font-mono"
            defaultValue={element.props.dataSource}
            onValueChange={handleDataChange}
          />
        </div>
      </div>
      <div className="my-4 bg-gray-200" />
      <Columns
        columns={columns}
        setCols={setColumns}
        columnVisibility={element.props.state?.columnVisibility}
        handleColumnVisibility={handleColumnVisibility}
      />
      <div className="my-3 bg-gray-200" />
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
      <div className="my-4 bg-gray-200" />
      <Pagination
        defaultEnablePagination={element.props.enablePagination}
        handleEnablePagination={handleEnablePagination}
        pageSizeValue={pageSizeValue}
        handlePageSizeChange={handlePageSizeChange}
      />
      <div className="my-4 bg-gray-200" />
      <Grouping
        columns={columns}
        groups={element.props.state?.grouping ?? []}
        handleGroupingChange={handleGroupingChange}
        aggregatedValues={
          element.props?.aggregatedValues?.map((v) => v.column) ?? []
        }
        handleAggregatedValuesChange={(value) => {}}
      />
    </div>
  )
}
