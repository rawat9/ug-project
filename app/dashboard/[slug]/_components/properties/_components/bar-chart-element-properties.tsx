'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'
import { useCanvasAtom } from '../../canvas/state'
import { BarChartElement } from '../../canvas/types'
import { useState } from 'react'
import { TextInput } from '@tremor/react'

import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'
import lodashMap from 'lodash/map'
import lodashCountBy from 'lodash/countBy'
import lodashSumBy from 'lodash/sumBy'
import lodashGroupBy from 'lodash/groupBy'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../editor/state'
import { Column } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { Eye } from '@/icons'
import { Switch } from '@/components/ui/switch'
import { cn, colors } from '@/lib/utils'

export function BarChartElementProperties({
  element,
}: {
  element: BarChartElement
}) {
  const { updateElement } = useCanvasAtom()

  const queries = useAtomValue(queriesAtom)
  console.log(queries)
  const [columns, setColumns] = useState(element.props.columns)

  function handleHeaderChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        header: value,
      },
    })
  }

  function handleXAxisTitleChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        xAxisTitle: value,
      },
    })
  }

  function handleYAxisTitleChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        yAxisTitle: value,
      },
    })
  }

  function handleDataChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        dataKey: value,
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
          const guessXAxis = result.columns.find(
            (c) => c.dtype === 'text',
          )?.name

          if (!guessXAxis) {
            return
          }

          const start = performance.now()
          const group = lodashGroupBy(result.data, guessXAxis)
          const integerColumns = result.columns.filter((col) =>
            col.dtype.startsWith('int'),
          )
          const results = lodashMap(group, (g, key) => {
            const cols = integerColumns.reduce((acc, col) => {
              return { ...acc, [col.name]: lodashSumBy(g, col.name) }
            }, {})

            return {
              [guessXAxis]: key,
              ...cols,
            }
          })
          const end = performance.now()
          console.log('It took: ', end - start)
          console.log(results.length)
          updateElement(element.id, {
            ...element,
            props: {
              ...element.props,
              data: results,
              originalData: result.data,
              dataKey: value,
              columns: result.columns,
              xAxis: guessXAxis,
              categories: integerColumns.map((c) => c.name),
            },
          })
          setColumns(result.columns)
        }
      }
    } catch {}
  }

  function handleXAxisChange(value: string) {
    const newGroup = lodashGroupBy(element.props.originalData, value)
    const integerColumns = columns.filter((col) => col.dtype.startsWith('int'))
    const results = lodashMap(newGroup, (g, key) => {
      const cols = integerColumns.reduce((acc, col) => {
        return { ...acc, [col.name]: lodashSumBy(g, col.name) }
      }, {})

      return {
        [value]: key,
        ...cols,
      }
    })

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        xAxis: value,
        data: results,
      },
    })
  }

  function handleGroupByChange(value: string) {
    const index = element.props.xAxis
    const existingGroup = lodashGroupBy(element.props.originalData, index)
    // const categories = new Set()
    const results = lodashMap(existingGroup, (g, key) => {
      // let aggFn = null

      // if (value === 'Count') {
      //   aggFn = lodashCountBy
      // } else if (value === 'Sum') {
      //   aggFn = lodashSumBy
      // } else if (value === 'Average') {
      //   aggFn = (g, value) => {
      //     return {
      //       [value]: lodashSumBy(g, value) / g.length,
      //     }
      //   }
      // }

      // const cols = lodashCountBy(g, 'gender')
      // const keys = Object.keys(cols)
      // keys.map((k) => categories.add(k))

      return {
        [index]: key,
        ...lodashCountBy(g, value),
      }
    })

    console.log(results)

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        groupBy: value,
        data: results,
        categories: ['Male', 'Female'],
      },
    })
  }

  function handleStackedGroupChange(value: boolean) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        stack: value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div>
        <Label htmlFor="title" className="text-xs text-slate-500">
          Title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="title"
          value={element.props.header}
          onValueChange={handleHeaderChange}
        />
      </div>
      <div>
        <Label htmlFor="data" className="text-xs text-slate-500">
          Data
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="data"
          placeholder="{{ getChartData }}"
          className="font-mono text-xs"
          defaultValue={element.props.dataKey}
          onValueChange={handleDataChange}
        />
      </div>
      <div>
        <Label htmlFor="x-axis" className="text-xs text-slate-500">
          X Axis
        </Label>
        <Select value={element.props.xAxis} onValueChange={handleXAxisChange}>
          <SelectTrigger id="x-axis" className="text-slate-500">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent className="-translate-x-full">
            {columns.map((column) => (
              <SelectItem key={column.name} value={column.name}>
                {column.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium leading-none text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Categories
        </p>
        <div className="grid gap-1">
          {element.props.categories.map((category, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <div
                  key={index}
                  className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-slate-100 bg-gray-50 p-2"
                >
                  <div className="h-4 w-4 rounded-md bg-fuchsia-800" />
                  <p className="text-sm text-slate-500">{category}</p>
                  <button className="ml-auto">
                    <Eye className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </PopoverTrigger>
              <PopoverContent
                alignOffset={-300}
                align="start"
                className="z-10 -translate-x-6"
                // onInteractOutside={(e) => e.preventDefault()}
              >
                <div className="grid gap-4">
                  <div className="grid items-center gap-2">
                    <Label
                      htmlFor="category"
                      className="text-xs text-slate-500"
                    >
                      Category
                    </Label>
                    <Input id="category" defaultValue={category} />
                  </div>
                  <div className="grid items-center gap-2">
                    <Label htmlFor="agg-fn" className="text-xs text-slate-500">
                      Aggregation Function
                    </Label>
                    <Select defaultValue="Sum">
                      <SelectTrigger id="agg-fn">
                        <SelectValue placeholder="Select an aggregation function" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="None">None</SelectItem>
                        <SelectItem value="Sum">Sum</SelectItem>
                        <SelectItem value="Count">Count</SelectItem>
                        <SelectItem value="Average">Average</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid items-center gap-2">
                    <p className="text-xs font-medium text-slate-500">Color</p>
                    <div className="grid grid-cols-6 gap-2">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          className={cn(
                            'h-8 w-full rounded-md py-1 shadow-md',
                            `bg-${color}-500`,
                          )}
                          // onClick={() => onColorChange(color)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="group-by" className="text-xs text-slate-500">
          Group by
        </Label>
        <Select
          value={element.props.groupBy}
          onValueChange={handleGroupByChange}
        >
          <SelectTrigger id="group-by" className="text-slate-500">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent
            alignOffset={-300}
            align="start"
            className="z-10 -translate-x-6"
          >
            {columns
              .filter((c) => c.dtype === 'text' || c.dtype === 'varchar')
              .map((column) => (
                <SelectItem key={column.name} value={column.name}>
                  {column.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      {element.props.groupBy && (
        <div className="flex items-center">
          <Switch
            id="stacked-group"
            checked={element.props.stack}
            onCheckedChange={handleStackedGroupChange}
          />
          <Label
            htmlFor="stacked-group"
            className="ml-2 text-xs text-slate-500"
          >
            Stack grouped data
          </Label>
        </div>
      )}
      <div>
        <Label htmlFor="x-title" className="text-xs text-slate-500">
          X-Axis title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="x-title"
          value={element.props.xAxisTitle}
          onValueChange={handleXAxisTitleChange}
        />
      </div>
      <div>
        <Label htmlFor="y-title" className="text-xs text-slate-500">
          Y-Axis title
        </Label>
        <TextInput
          type="text"
          autoComplete="off"
          id="y-title"
          value={element.props.yAxisTitle}
          onValueChange={handleYAxisTitleChange}
        />
      </div>
    </div>
  )
}
