import { BarChart, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarChartElement } from '../../types'
import { EmptyDataState } from './empty-state'
import Markdown from 'react-markdown'

const BarChartElement = memo(({ element }: { element: BarChartElement }) => {
  return (
    <Card className="h-full w-full overflow-hidden">
      {element.props.title && (
        <Markdown className="prose -mb-6 line-clamp-1 font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
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
            <BarChart
              className="h-full w-full py-4"
              data={element.props.data}
              index={element.props.index}
              categories={
                element.props.groupedCategories.length > 0
                  ? element.props.groupedCategories
                  : element.props.categories.map((category) => category.name)
              }
              colors={element.props.colors}
              stack={element.props.stack}
              onValueChange={(event) => {
                element.props.selected = event
              }}
              showAnimation={true}
              showXAxis={true}
              showYAxis={true}
              showGridLines={true}
              enableLegendSlider={true}
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

BarChartElement.displayName = 'BarChartElement'

export { BarChartElement }
