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
import { TextInput } from '@tremor/react'

import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'
import lodashMap from 'lodash/map'
import lodashCountBy from 'lodash/countBy'
import lodashSumBy from 'lodash/sumBy'
import lodashMeanBy from 'lodash/meanBy'
import lodashGroupBy from 'lodash/groupBy'
import lodashUniq from 'lodash/uniq'
import lodashKeys from 'lodash/keys'
import lodashFlatMap from 'lodash/flatMap'
import lodashMerge from 'lodash/merge'
import lodashOmit from 'lodash/omit'

import { Delete, Help } from '@/icons'
import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../editor/state'
import { Column } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { Add, Check } from '@/icons'
import { Switch } from '@/components/ui/switch'
import { Listbox, Transition } from '@headlessui/react'
import * as React from 'react'
import toast from 'react-hot-toast'
import { colors, isTextType } from '@/lib/utils'

export function BarChartElementProperties({
  element,
}: {
  element: BarChartElement
}) {
  const { updateElement } = useCanvasAtom()

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

      const guessXAxis = result.columns.find((c) => c.dtype === 'text')?.name

      if (!guessXAxis) {
        return
      }

      const group = lodashGroupBy(result.data, guessXAxis)
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
          categories: integerColumns.map((c) => ({
            name: c.name,
            aggFn: 'sum' as const,
          })),
        },
      })
    }
  }

  function handleIndexChange(value: string) {
    const { originalData, categories } = element.props

    const group = lodashGroupBy(originalData, value)
    const results = lodashMap(group, (g, key) => {
      const cols = categories.reduce((acc, category) => {
        const aggFn = category.aggFn

        switch (aggFn) {
          case 'count':
            return { ...acc, [category.name]: g.length }
          case 'sum':
            return { ...acc, [category.name]: lodashSumBy(g, category.name) }
          case 'mean':
            return { ...acc, [category.name]: lodashMeanBy(g, category.name) }
        }
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

  function handleStackedGroupChange(value: boolean) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        stack: value,
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
    const { index, data: currentData } = element.props
    const existingGroup = lodashGroupBy(element.props.originalData, index)

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

  function handleCategoryChange(category: string[]) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        categories: category.map((c) => ({
          name: c,
          aggFn: 'sum' as const,
        })),
      },
    })
  }

  function handleGroupByChange(value: string) {
    const {
      originalData,
      index,
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

    const group = lodashGroupBy(originalData, index)
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

  return (
    <div className="flex flex-col gap-4 px-4 pb-4">
      <div>
        <Label
          htmlFor="title"
          className="inline-flex items-center text-xs text-slate-500"
        >
          Title
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Help className="ml-1 h-3 w-3 cursor-pointer text-slate-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">Supports Markdown.</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              .filter((c) => isTextType(c.dtype))
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
          <p className="text-xs font-medium leading-none text-slate-500">
            Categories
          </p>
          <Listbox
            value={element.props.categories.map((c) => c.name)}
            onChange={handleCategoryChange}
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
                <PopoverTrigger asChild>
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
                      <Input
                        id="category-name"
                        value={category.name}
                        disabled
                      />
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
                          <SelectItem value="mean">Mean</SelectItem>
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
