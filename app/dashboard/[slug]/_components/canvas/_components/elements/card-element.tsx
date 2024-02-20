import { Card, Metric, Text } from '@tremor/react'
import { memo } from 'react'
import { Element } from '../../types'

const CardElement = memo(({ element }: { element: Element }) => {
  return (
    <Card className="h-full" decoration="top" decorationColor="indigo">
      <Text>Sales</Text>
      <Metric>£ 34,743</Metric>
    </Card>
  )
})

CardElement.displayName = 'CardElement'
export { CardElement }
