'use client'

import { motion } from 'framer-motion'
import { CanvasLoadingSpinner } from '@/icons/CanvasLoadingSpinner'

export function Loading() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex min-h-screen w-full touch-none flex-col items-center justify-center gap-2 bg-white/60"
    >
      <CanvasLoadingSpinner className="h-10 w-10" />
      <p className="font-mono antialiased">Loading...</p>
    </motion.div>
  )
}
