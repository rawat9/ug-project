import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Disables Grammarly on the query editor
 */
export function disableGrammarly() {
  const el = document.getElementsByClassName('cm-content')[0] as Element
  el.setAttribute('data-enable-grammarly', 'false')
}

/**
 * Returns a value within a range
 */
export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
