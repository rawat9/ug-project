'use client'

import Search from '@/components/shared/search'
import { TextWidget } from './_components/text-widget'
import { CardWidget } from './_components/card-widget'
import { AreaChartWidget } from './_components/area-chart-widget'
import { TableWidget } from './_components/table-widget'
import { Cross } from '@/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LineChartWidget } from './_components/line-chart-widget'
import { BarChartWidget } from './_components/bar-chart-widget'
import { BarListWidget } from './_components/bar-list-widget'

export function Widgets({ isOpen }: { isOpen: boolean }) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const handleCollapse = () => {
    params.delete('widgets')
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.2,
          }}
          className="absolute left-4 top-4 z-50 block h-[550px] w-[300px] rounded-md bg-white shadow-md"
        >
          <div className="h-full">
            <div className="flex items-center justify-between p-4 pb-1">
              <h2 className="text-md font-semibold">Widgets</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCollapse}
              >
                <Cross className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[90%] overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-2">
                <TextWidget />
                <CardWidget />
                <TableWidget />
                <AreaChartWidget />
                <LineChartWidget />
                <BarChartWidget />
                <BarListWidget />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
