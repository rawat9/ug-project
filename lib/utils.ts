import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function disableGrammarly() {
  const el = document.getElementsByClassName('cm-content')[0] as Element
  el.setAttribute('data-enable-grammarly', 'false')
}
