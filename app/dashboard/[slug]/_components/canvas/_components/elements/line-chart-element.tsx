import { Card, LineChart } from '@tremor/react'
import { memo } from 'react'

import { type LineChartElement } from '../../types'
import { EmptyDataState } from './empty-state'
import Markdown from 'react-markdown'

const LineChartElement = memo(({ element }: { element: LineChartElement }) => {
  return (
    <Card className="h-full w-full">
      {element.props.title && (
        <Markdown className="truncase prose -mb-6 font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {element.props.title}
        </Markdown>
      )}
      {element.props.data.length === 0 ? (
        <EmptyDataState />
      ) : (
        <div className="flex h-full">
          {element.props.yAxisTitle && (
            <h3 className="rotate-180 text-center text-xs text-slate-400 [writing-mode:vertical-lr]">
              {element.props.yAxisTitle}
            </h3>
          )}
          <div className="flex h-full w-full flex-col">
            <LineChart
              className="h-full w-full py-4"
              data={element.props.data}
              index={element.props.index}
              categories={
                element.props.groupedCategories.length > 0
                  ? element.props.groupedCategories
                  : element.props.categories.map((category) => category.name)
              }
              showGridLines={true}
              curveType={element.props.curveType}
              // startEndOnly={true} // this!!
              onValueChange={(v) => console.log(v)}
            />
            {element.props.xAxisTitle && (
              <h3 className="mb-1 text-center text-xs text-slate-400">
                {element.props.xAxisTitle}
              </h3>
            )}
          </div>
        </div>
      )}
    </Card>
  )
})

LineChartElement.displayName = 'LineChartElement'

export { LineChartElement }
