import { atom } from 'jotai'
import type { Layout } from 'react-grid-layout'

export const draggedWidget = atom<Pick<Layout, 'i' | 'w' | 'h'> | null>(null)
