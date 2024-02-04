import { forwardRef } from 'react'
import styles from './resize-handle.module.css'
import clsx from 'clsx'

interface ResizeHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  handleAxis: string
}

const ResizeHandle = forwardRef<HTMLDivElement, ResizeHandleProps>(
  (props, ref) => {
    const { handleAxis, ...restProps } = props
    return (
      <div
        className={clsx(
          `handle handle-${handleAxis} resize-handle-component`,
          styles.handle,
          styles[`handle-${handleAxis}`],
        )}
        ref={ref}
        {...restProps}
      ></div>
    )
  },
)

ResizeHandle.displayName = 'ResizeHandle'

export { ResizeHandle }
