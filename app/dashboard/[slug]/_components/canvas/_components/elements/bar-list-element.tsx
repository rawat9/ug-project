import { BarList, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarListElement } from '../../types'
import { EmptyDataState } from './empty-state'

// const dataFormatter = (number: number) =>
//   Intl.NumberFormat('us').format(number).toString()

const BarListElement = memo(({ element }: { element: BarListElement }) => {
  return (
    <Card className="h-full w-full overflow-hidden">
      <h3 className="line-clamp-1 text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.title}
      </h3>
      {element.props.data.length === 0 ? (
        <EmptyDataState />
      ) : (
        // <h3 className="text-tremor-title text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">Website Analytics</h3>
        <>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>Source</span>
            <span>Views</span>
          </p>
          <BarList data={element.props.data} className="mt-2 h-full w-full" />
        </>
        // <BarList
        //   className="h-full w-full py-6"
        //   data={element.props.data}
        //   color={element.props.color}
        //   // onValueChange={(event) => {
        //   //   element.props.selected = event
        //   // }}
        //   showAnimation={true}
        // />
      )}
    </Card>
  )
})

BarListElement.displayName = 'BarListElement'

export { BarListElement }
