import { BarChart, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarChartElement } from '../../types'
import { EmptyDataState } from './empty-state'
import Markdown from 'react-markdown'

// const dataFormatter = (number: number) =>
//   Intl.NumberFormat('us').format(number).toString()

const BarChartElement = memo(({ element }: { element: BarChartElement }) => {
  return (
    <Card className="h-full w-full overflow-hidden">
      {element.props.header && (
        <Markdown className="prose -mb-6 line-clamp-1 font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          {element.props.header}
        </Markdown>
      )}
      {element.props.data.length === 0 ? (
        <EmptyDataState />
      ) : (
        <div className="flex h-full">
          {element.props.xAxisTitle && (
            <h3 className="rotate-180 text-center text-xs text-gray-400 [writing-mode:vertical-lr]">
              {element.props.xAxisTitle}
            </h3>
          )}
          <div className="flex h-full w-full flex-col">
            <BarChart
              className="h-full w-full py-4"
              data={element.props.data}
              index={element.props.xAxis}
              categories={element.props.categories}
              colors={['blue', 'slate', 'pink']}
              stack={element.props.stack}
              onValueChange={(event) => {
                element.props.selected = event
              }}
              showAnimation={true}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
            />
            {element.props.yAxisTitle && (
              <h3 className="mb-1 text-center text-xs text-gray-400">
                {element.props.yAxisTitle}
              </h3>
            )}
          </div>
        </div>
      )}
    </Card>
  )
})

BarChartElement.displayName = 'BarChartElement'

export { BarChartElement }
