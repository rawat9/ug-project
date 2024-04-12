'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { LineChartElement } from '../../canvas/types'
import lodashResult from 'lodash/result'
import lodashKeyBy from 'lodash/keyBy'
import lodashMap from 'lodash/map'
import lodashCountBy from 'lodash/countBy'
import lodashSortBy from 'lodash/sortBy'
import lodashSumBy from 'lodash/sumBy'
import lodashGroupBy from 'lodash/groupBy'
import lodashOmit from 'lodash/omit'
import lodashUniq from 'lodash/uniq'
import lodashKeys from 'lodash/keys'
import lodashFlatMap from 'lodash/flatMap'
import lodashMerge from 'lodash/merge'
import lodashMeanBy from 'lodash/meanBy'

import { CurveType, Tab, TabGroup, TabList, TextInput } from '@tremor/react'

import { Column } from '@/types'
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../editor/state'
import { colors, isDateType } from '@/lib/utils'
import toast from 'react-hot-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Listbox, Transition } from '@headlessui/react'
import { Add, Check, Delete } from '@/icons'
import { Input } from '@/components/ui/input'
import React from 'react'

export function LineChartElementProperties({
  element,
}: {
  element: LineChartElement
}) {
  const { updateElement } = useCanvasAtom()
  const curveTypes = React.useMemo<CurveType[]>(
    () => ['linear', 'natural', 'monotone', 'step'],
    [],
  )
  const queries = useAtomValue(queriesAtom)

  function handleTitleChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        title: value,
      },
    })
  }

  function handleDataChange(value: string) {
    if (!queries.length) {
      return
    }
    const result = lodashResult(lodashKeyBy(queries, 'name'), value) as
      | {
          data: unknown[]
          columns: Column[]
        }
      | undefined

    if (result) {
      if (!result.data) {
        return toast.error('No data found. Please execute the query.')
      }

      const guessXAxis = result.columns.find((c) => isDateType(c.dtype))?.name

      if (!guessXAxis) {
        return toast.error('No date column found. Please select a date column.')
      }

      const group = lodashGroupBy(
        lodashSortBy(result.data, value),
        (column: any) => {
          return new Date(column[guessXAxis]).toLocaleString('default', {
            month: 'short',
            year: 'numeric',
          })
        },
      )

      const integerColumns = result.columns.filter(
        (col) => col.dtype.startsWith('int') || col.dtype.startsWith('float'),
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
      updateElement(element.id, {
        ...element,
        props: {
          ...element.props,
          data: results,
          originalData: result.data,
          columns: result.columns,
          dataKey: value,
          index: guessXAxis,
          indexTimeGranularity: 'Monthly',
          categories: integerColumns.map((c) => ({
            name: c.name,
            aggFn: 'sum' as const,
            hidden: false,
          })),
        },
      })
    }
  }

  function handleCategoriesChange(categories: string[]) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        categories: categories.map((c) => ({
          name: c,
          aggFn: 'sum' as const,
          hidden: false,
        })),
      },
    })
  }

  function handleIndexChange(value: string) {
    const { originalData, categories, columns, index, indexTimeGranularity } =
      element.props

    const columnType = columns.find((c) => c.name === index)?.dtype

    if (!columnType) {
      return
    }

    if (!isDateType(columnType)) {
      return toast.error('Invalid column type. Please select a date column.')
    }

    const group = lodashGroupBy(
      lodashSortBy(originalData, value),
      (column: any) => {
        switch (indexTimeGranularity) {
          case 'Yearly':
            return new Date(column[index]).getFullYear()
          case 'Monthly':
            return new Date(column[index]).toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            })
          case 'Daily':
            return new Date(column[index]).toLocaleDateString()
          default:
            return column[index]
        }
      },
    )

    const results = lodashMap(group, (g, key) => {
      const cols = categories.reduce((acc, category) => {
        return { ...acc, [category.name]: lodashSumBy(g, category.name) }
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
        index: value,
        data: results,
        groupedCategories: [],
      },
    })
  }

  function handleIndexTimeGranularity(value: 'Daily' | 'Monthly' | 'Yearly') {
    const {
      originalData,
      categories,
      groupBy,
      groupedCategories,
      data: currentData,
      index,
    } = element.props

    const group = lodashGroupBy(
      lodashSortBy(originalData, index),
      (column: any) => {
        switch (value) {
          case 'Yearly':
            return new Date(column[index]).getFullYear()
          case 'Monthly':
            return new Date(column[index]).toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            })
          case 'Daily':
            return new Date(column[index]).toLocaleDateString()
          default:
            return column[index]
        }
      },
    )

    const results = lodashMap(group, (g, key) => {
      const cols = categories.reduce((acc, category) => {
        return { ...acc, [category.name]: lodashSumBy(g, category.name) }
      }, {})

      if (groupBy) {
        const grouped = lodashGroupBy(g, groupBy)

        const cols: Record<string, number> = {}
        lodashMap(grouped, (g, key) => {
          categories.forEach((category) => {
            cols[key] = lodashSumBy(g, category.name)
          })
        })
        return {
          [index]: key,
          ...cols,
        }
      } else {
        return {
          [index]: key,
          ...cols,
        }
      }
    })

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        indexTimeGranularity: value,
        data: results,
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

  function handleGroupByChange(value: string) {
    const {
      originalData,
      index,
      indexTimeGranularity,
      data: currentData,
      groupedCategories: currentGroupedCategories,
    } = element.props

    // removing group by
    if (value === 'None') {
      updateElement(element.id, {
        ...element,
        props: {
          ...element.props,
          groupBy: '',
          data: currentData.map((obj) =>
            lodashOmit(obj, currentGroupedCategories),
          ),
          groupedCategories: [], // remove the grouped column
        },
      })
      return
    }

    const group = lodashGroupBy(
      lodashSortBy(originalData, index),
      (column: any) => {
        switch (indexTimeGranularity) {
          case 'Yearly':
            return new Date(column[index]).getFullYear()
          case 'Monthly':
            return new Date(column[index]).toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            })
          case 'Daily':
            return new Date(column[index]).toLocaleDateString()
          default:
            return column[index]
        }
      },
    )

    const results = lodashMap(group, (g, key) => {
      return {
        [index]: key,
        ...lodashCountBy(g, value),
      }
    })

    const groupedCategories = lodashUniq(
      lodashFlatMap(results, (obj) => lodashKeys(obj)),
    ).filter((c) => c !== index)

    if (groupedCategories.length >= colors.length) {
      return toast.error('Too many categories to group')
    }

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        groupBy: value,
        data: lodashMerge(currentData, results),
        groupedCategories,
      },
    })
  }

  function handleCurveTypeChange(index: number) {
    const curveType = curveTypes[index]
    if (!curveType) return

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        curveType,
      },
    })
  }

  function handleRemoveCategory(category: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        categories: element.props.categories.filter((c) => c.name !== category),
      },
    })
  }

  function handleAggregationFnChange(
    aggregrationFn: 'sum' | 'mean' | 'count',
    category: string,
  ) {
    const {
      index,
      data: currentData,
      originalData,
      indexTimeGranularity,
    } = element.props

    const existingGroup = lodashGroupBy(
      lodashSortBy(originalData, index),
      (column: any) => {
        switch (indexTimeGranularity) {
          case 'Yearly':
            return new Date(column[index]).getFullYear()
          case 'Monthly':
            return new Date(column[index]).toLocaleString('default', {
              month: 'short',
              year: 'numeric',
            })
          case 'Daily':
            return new Date(column[index]).toLocaleDateString()
          default:
            return column[index]
        }
      },
    )

    const results = lodashMap(existingGroup, (g, key) => {
      switch (aggregrationFn) {
        case 'count':
          return {
            [index]: key,
            [category]: g.length,
          }
        case 'sum':
          return {
            [index]: key,
            [category]: lodashSumBy(g, category),
          }
        case 'mean':
          return {
            [index]: key,
            [category]: lodashMeanBy(g, category),
          }
      }
    })

    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        data: lodashMerge(currentData, results),
        categories: element.props.categories.map((c) =>
          c.name === category ? { ...c, aggFn: aggregrationFn } : c,
        ),
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
          value={element.props.title}
          onValueChange={handleTitleChange}
        />
      </div>
      <div>
        <Label htmlFor="data" className="text-xs text-slate-500">
          Data
        </Label>
        <Select value={element.props.dataKey} onValueChange={handleDataChange}>
          <SelectTrigger id="data" placeholder="getData">
            <SelectValue className="font-mono text-xs" />
          </SelectTrigger>
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
        </Select>
      </div>
      <div>
        <Label htmlFor="index" className="text-xs text-slate-500">
          Index
        </Label>
        <Select value={element.props.index} onValueChange={handleIndexChange}>
          <SelectTrigger id="index">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent
            alignOffset={-300}
            align="start"
            className="z-10 max-h-60 -translate-x-6"
          >
            {element.props.columns
              .filter((c) => isDateType(c.dtype))
              .map((column) => (
                <SelectItem key={column.name} value={column.name}>
                  {column.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium leading-none text-slate-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Categories
          </p>
          <Listbox
            value={element.props.categories.map((c) => c.name)}
            onChange={handleCategoriesChange}
            multiple
          >
            <div>
              <Listbox.Button className="rounded-md p-1 hover:bg-gray-50">
                <Add className="h-4 w-4 text-slate-500" />
              </Listbox.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute -left-2 top-64 z-10 mt-1 max-h-60 w-auto -translate-x-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {element.props.columns
                    .filter(
                      (c) =>
                        c.dtype.startsWith('int') ||
                        c.dtype.startsWith('float') ||
                        c.dtype.startsWith('numeric'),
                    )
                    .map((category, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-slate-100' : 'text-gray-900'
                          }`
                        }
                        value={category.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {category.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-600">
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
        <div className="grid gap-1">
          {element.props.categories.length ? (
            element.props.categories.map((category, index) => (
              <Popover key={index}>
                <PopoverTrigger asChild disabled={true}>
                  <div
                    key={index}
                    aria-disabled="true"
                    className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-md border border-slate-100 bg-gray-50 p-2 disabled:bg-gray-100"
                  >
                    <p className="flex-1 text-sm text-slate-700">
                      {category.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="rounded-md border bg-neutral-50 px-1 text-xs text-slate-700">
                        {category.aggFn}
                      </p>
                      <button
                        onClick={() => handleRemoveCategory(category.name)}
                      >
                        <Delete className="h-4 w-4 text-slate-500" />
                      </button>
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  alignOffset={-300}
                  align="start"
                  className="z-10 -translate-x-6"
                >
                  <div className="grid gap-4">
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="category-name"
                        className="text-xs text-slate-500"
                      >
                        Category
                      </Label>
                      <Input id="category-name" defaultValue={category.name} />
                    </div>
                    <div className="grid items-center gap-2">
                      <Label
                        htmlFor="category-agg-fn"
                        className="text-xs text-slate-500"
                      >
                        Aggregation Function
                      </Label>
                      <Select
                        value={category.aggFn}
                        onValueChange={(value: 'sum' | 'mean' | 'count') =>
                          handleAggregationFnChange(value, category.name)
                        }
                      >
                        <SelectTrigger id="category-agg-fn">
                          <SelectValue placeholder="Select an aggregation function" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sum">Sum</SelectItem>
                          <SelectItem value="count">Count</SelectItem>
                          <SelectItem value="mean">Average</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))
          ) : (
            <div className="flex h-16 items-center justify-center rounded-md border border-dashed bg-neutral-50">
              <p className="text-xs text-slate-500">No categories</p>
            </div>
          )}
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
          <SelectTrigger id="group-by">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent
            alignOffset={-300}
            align="start"
            className="z-10 max-h-60 -translate-x-6"
          >
            <SelectItem value="None">None</SelectItem>
            {element.props.columns
              .filter((c) => c.dtype === 'text' || c.dtype === 'varchar')
              .map((column) => (
                <SelectItem key={column.name} value={column.name}>
                  {column.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label
          htmlFor="index-time-granularity"
          className="text-xs text-slate-500"
        >
          Index time granularity
        </Label>
        <Select
          value={element.props.indexTimeGranularity}
          onValueChange={handleIndexTimeGranularity}
        >
          <SelectTrigger id="index-time-granularity">
            <SelectValue placeholder="Select a column" />
          </SelectTrigger>
          <SelectContent
            alignOffset={-300}
            align="start"
            className="z-10 max-h-60 -translate-x-6"
          >
            {['Daily', 'Monthly', 'Yearly'].map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
      <div className="space-y-1">
        <p className="text-xs font-medium text-slate-500">Curve type</p>
        <TabGroup
          onIndexChange={handleCurveTypeChange}
          defaultIndex={curveTypes.indexOf(element.props.curveType)}
        >
          <TabList variant="solid" className="w-full">
            {curveTypes.map((curveType, index) => (
              <Tab
                key={index}
                className="w-full justify-center text-xs ui-selected:text-slate-700"
              >
                {curveType}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  )
}
