import { memo } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { type TextElement } from '../../types'
import { Card } from '@tremor/react'
import { cn } from '@/lib/utils'

const TextElement = memo(({ element }: { element: TextElement }) => {
  const { color, fontSize, alignment, displayValue, type } = element.props

  const alignmentStyle = {
    alignItems: alignment.items,
    justifyContent: alignment.justify,
  }

  return (
    <>
      {type === 'markdown' ? (
        <Card
          className="flex h-full w-full overflow-hidden"
          style={alignmentStyle}
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            className={cn('prose', `text-${color}-500`)}
          >
            {displayValue}
          </Markdown>
        </Card>
      ) : (
        <div
          className="flex h-full w-full overflow-hidden"
          style={alignmentStyle}
        >
          <p
            className={`text-${color}-500`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {displayValue}
          </p>
        </div>
      )}
    </>
  )
})

TextElement.displayName = 'TextField'

export { TextElement }
