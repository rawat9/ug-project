import { useEffect } from 'react'

/**
 * Custom hook to handle click outside selected element but inside canvas
 * @param ref - reference to the canvas element i.e ReactGridLayout
 * @param callback
 */
export const useClickOutsideSelectedElementButInsideCanvas = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback: (e: Event) => void,
) => {
  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.target as HTMLDivElement

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return
      }

      if (ref.current && ref.current === target) {
        callback(event)
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [callback, ref])
}
