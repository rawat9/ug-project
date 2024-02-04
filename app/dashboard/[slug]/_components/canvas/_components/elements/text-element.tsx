import { memo } from 'react'
import { Element } from '../../types'
import Markdown from 'react-markdown'

const TextElement = memo(({ element }: { element: Element }) => {
  return (
    <Markdown className="prose text-tremor-default text-tremor-content dark:text-dark-tremor-content">
      {element.props.value}
    </Markdown>
  )
})

TextElement.displayName = 'TextField'

export { TextElement }
