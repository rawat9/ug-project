import { BarChart, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarChartElement } from '../../types'

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
]

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString()

const BarChartElement = memo(({ element }: { element: BarChartElement }) => {
  return (
    <Card className="h-full w-full">
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.header}
      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={['Number of threatened species']}
        colors={['blue']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  )
})

BarChartElement.displayName = 'BarChartElement'

export { BarChartElement }
