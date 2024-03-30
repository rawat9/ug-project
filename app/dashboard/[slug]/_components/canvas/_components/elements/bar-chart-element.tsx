import { BarChart, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarChartElement } from '../../types'
import { EmptyDataState } from './empty-state'

// const dataFormatter = (number: number) =>
//   Intl.NumberFormat('us').format(number).toString()

const BarChartElement = memo(({ element }: { element: BarChartElement }) => {
  return (
    <Card className="h-full w-full">
      <h3 className="line-clamp-1 text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.header}
      </h3>
      {element.props.data.length === 0 ? (
        <EmptyDataState />
      ) : (
        <BarChart
          className="h-full w-full py-6"
          data={element.props.data}
          index={element.props.xAxis}
          categories={element.props.categories}
          colors={['blue', 'slate', 'pink']}
          stack={element.props.stack}
          // valueFormatter={dataFormatter}
          // yAxisWidth={48}
          onValueChange={(event) => {
            element.props.selected = event
          }}
          showAnimation={true}
          showXAxis={true}
          showYAxis={true}
          showGridLines={true}
        />
      )}
    </Card>
  )
})

BarChartElement.displayName = 'BarChartElement'

export { BarChartElement }
