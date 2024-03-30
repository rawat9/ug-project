import * as React from 'react'
import RGL, {
  WidthProvider,
  type ReactGridLayoutProps,
} from 'react-grid-layout'

function GridLayout(props: ReactGridLayoutProps) {
  const ReactGridLayout = React.useMemo(() => WidthProvider(RGL), [])

  return (
    <ReactGridLayout
      style={{ height: '100%', width: '100%' }}
      containerPadding={[10, 10]}
      cols={12}
      rowHeight={30}
      resizeHandles={['sw', 'nw', 'se', 'ne']}
      isDroppable={true}
      preventCollision={true}
      compactType={null}
      useCSSTransforms={true}
      measureBeforeMount={true}
      {...props}
    >
      {props.children}
    </ReactGridLayout>
  )
}

export default React.memo(GridLayout)
