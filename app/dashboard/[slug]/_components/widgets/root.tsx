'use client'

import Search from '@/components/shared/search'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { TextWidget } from './_components/text-widget'
import { CardWidget } from './_components/card-widget'
import { AreaChartWidget } from './_components/area-chart-widget'
import { Cross } from '@/icons'

export function Widgets({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
          className={cn(
            'z-990 absolute left-4 top-2 block w-[300px] rounded-lg bg-white p-4 drop-shadow-xl', // 'block duration-500 animate-in fade-in-100 slide-in-from-left-full',
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Components</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Cross className="h-5 w-5" />
            </button>
          </div>
          <div className="relative">
            <Search />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <TextWidget />
            <CardWidget />
            <AreaChartWidget />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
