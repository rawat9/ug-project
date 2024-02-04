import React from 'react'

import styles from './Grid.module.css'
import { cn } from '@/lib/utils'

export interface Props {
  size: number
  step?: number
  //   onSizeChange(size: number): void
}

export function Grid({ size }: Props) {
  return (
    <div
      className={cn(styles.Grid, 'opacity-40')}
      style={
        {
          '--grid-size': `${size}px`,
        } as React.CSSProperties
      }
    />
  )
}
