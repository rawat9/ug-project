import { useMemo } from 'react'
import RGL, {
  WidthProvider,
  type ReactGridLayoutProps,
} from 'react-grid-layout'

export function GridLayout(props: ReactGridLayoutProps) {
  const ReactGridLayout = useMemo(() => WidthProvider(RGL), [])

  return (
    <ReactGridLayout
      style={{ height: '100%' }}
      containerPadding={[10, 20]}
      cols={12}
      rowHeight={30}
      resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
      // isBounded={true} // Enable this once this issue is merged PR- https://github.com/react-grid-layout/react-grid-layout/pull/2017
      isDroppable={true}
      preventCollision={true}
      compactType={null}
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  )
}