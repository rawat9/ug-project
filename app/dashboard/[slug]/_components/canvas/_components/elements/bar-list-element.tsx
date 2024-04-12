import { BarList, Card } from '@tremor/react'
import { memo } from 'react'
import type { BarListElement } from '../../types'
import { EmptyDataState } from './empty-state'
import Markdown from 'react-markdown'
import upperFirst from 'lodash/upperFirst'

const BarListElement = memo(({ element }: { element: BarListElement }) => {
  return (
    <Card className="h-full w-full overflow-hidden">
      <Markdown className="prose line-clamp-1 text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {element.props.title}
      </Markdown>
      {element.props.data.length === 0 ? (
        <EmptyDataState />
      ) : (
        <>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>{upperFirst(element.props.name)}</span>
            <span>{upperFirst(element.props.value)}</span>
          </p>
          <BarList
            data={element.props.data}
            className="mt-2 h-full w-full"
            color={element.props.color}
            showAnimation={true}
          />
        </>
      )}
    </Card>
  )
})

BarListElement.displayName = 'BarListElement'

export { BarListElement }
