import { Card, LineChart } from '@tremor/react'
import { memo } from 'react'

import { type LineChartElement } from '../../types'

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'Jul 22',
    SemiAnalysis: 3490,
    'The Pragmatic Engineer': 1982,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2903,
    'The Pragmatic Engineer': 2012,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2643,
    'The Pragmatic Engineer': 2342,
  },
  {
    date: 'Oct 22',
    SemiAnalysis: 2837,
    'The Pragmatic Engineer': 2473,
  },
  {
    date: 'Nov 22',
    SemiAnalysis: 2954,
    'The Pragmatic Engineer': 3848,
  },
  {
    date: 'Dec 22',
    SemiAnalysis: 3239,
    'The Pragmatic Engineer': 3736,
  },
]

const valueFormatter = function (num: number) {
  return '$' + new Intl.NumberFormat('us').format(num).toString()
}

const LineChartElement = memo(({ element }: { element: LineChartElement }) => {
  return (
    <Card className="h-full w-full">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.header}
      </h3>
      <LineChart
        className="h-full w-full py-4"
        data={element.props.data}
        index={element.props.xAxis}
        categories={element.props.yAxis}
        colors={['indigo', 'rose']}
        valueFormatter={valueFormatter}
        onValueChange={(v) => console.log(v)}
      />
    </Card>
  )
})

LineChartElement.displayName = 'LineChartElement'

export { LineChartElement }
