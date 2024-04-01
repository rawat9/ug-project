'use client'

import { Label } from '@/components/ui/label'
import { useCanvasAtom } from '../../canvas/state'
import { BarListElement } from '../../canvas/types'
import { TextInput } from '@tremor/react'

import lodashKeyBy from 'lodash/keyBy'
import lodashResult from 'lodash/result'
import lodashMap from 'lodash/map'
import lodashSumBy from 'lodash/sumBy'
import lodashGroupBy from 'lodash/groupBy'

import { useAtomValue } from 'jotai'
import { queriesAtom } from '../../editor/state'
import { Column } from '@/types'

export function BarListElementProperties({
  element,
}: {
  element: BarListElement
}) {
  const { updateElement } = useCanvasAtom()

  const queries = useAtomValue(queriesAtom)
  // const [columns, setColumns] = useState(element.props.columns)

  function handleHeaderChange(value: string) {
    updateElement(element.id, {
      ...element,
      props: {
        ...element.props,
        title: value,
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
              dataKey: value,
              // columns: result.columns,
              // xAxis: guessXAxis,
              // categories: integerColumns.map((c) => c.name),
            },
          })
        }
      }
    } catch {}
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-4 px-4">
        <div>
          <Label htmlFor="title" className="text-xs text-slate-500">
            Title
          </Label>
          <TextInput
            type="text"
            autoComplete="off"
            id="title"
            value={element.props.title}
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
      </div>
    </div>
  )
}
