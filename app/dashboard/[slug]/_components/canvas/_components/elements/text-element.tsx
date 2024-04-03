import { memo } from 'react'
import Markdown from 'react-markdown'

import { type TextElement } from '../../types'

const TextElement = memo(({ element }: { element: TextElement }) => {
  const { value, alignment, dynamicValue } = element.props
  const alignmentStyle = {
    alignItems: alignment.items,
    justifyContent: alignment.justify,
  }

  return (
    <div className="flex h-full w-full" style={alignmentStyle}>
      <Markdown className="prose text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {dynamicValue ?? value}
      </Markdown>
    </div>
  )
})

TextElement.displayName = 'TextField'

export { TextElement }
