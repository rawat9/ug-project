import { Card, LineChart } from '@tremor/react'
import { memo } from 'react'

import { type LineChartElement } from '../../types'

const LineChartElement = memo(({ element }: { element: LineChartElement }) => {
  return (
    <Card className="h-full w-full">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.title}
      </h3>
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
        // minValue={50000}
        // curveType="linear" this!!
        // startEndOnly={true} // this!!
        tickGap={10} // this!!
        onValueChange={(v) => console.log(v)}
      />
    </Card>
  )
})

LineChartElement.displayName = 'LineChartElement'

export { LineChartElement }
