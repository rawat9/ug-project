import { Card, Metric, Text } from '@tremor/react'
import { memo } from 'react'
import { type CardElement } from '../../types'

const CardElement = memo(({ element }: { element: CardElement }) => {
  return (
    <Card
      className="h-full overflow-hidden"
      decoration="top"
      decorationColor="indigo"
    >
      <Text>Sales</Text>
      <Metric>£ 34,743</Metric>
    </Card>
  )
})

CardElement.displayName = 'CardElement'
export { CardElement }
