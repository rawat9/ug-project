import { memo } from 'react'
import { Element } from '../../types'
import Markdown from 'react-markdown'

const TextElement = memo(({ element }: { element: Element }) => {
  const { value, alignment } = element.props
  const alignmentStyle = {
    alignItems: alignment.items,
    justifyContent: alignment.justify,
  }

  return (
    <div className="flex h-full w-full" style={alignmentStyle}>
      <Markdown className="prose text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {value}
      </Markdown>
    </div>
  )
})

TextElement.displayName = 'TextField'

export { TextElement }
