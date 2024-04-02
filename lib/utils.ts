import { Color } from '@tremor/react'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import tailwindColors from 'tailwindcss/colors'

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

export function isNumberArray(arr: any): arr is number[] {
  return Array.isArray(arr) && arr.every((val) => typeof val === 'number')
}

export const colors = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] satisfies Color[]

export function getColor(color: Color) {
  return tailwindColors[color]['500']
}
