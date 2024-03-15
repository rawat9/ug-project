'use client'

import Search from '@/components/shared/search'
import { TextWidget } from './_components/text-widget'
import { CardWidget } from './_components/card-widget'
import { AreaChartWidget } from './_components/area-chart-widget'
import { Cross } from '@/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{
            type: 'tween',
            duration: 0.2,
          }}
          className="absolute left-2 top-2 z-50 block h-[550px] w-[300px] rounded-md bg-white shadow-md"
        >
          <div className="h-full">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-md font-semibold">Widgets</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={handleCollapse}
              >
                <Cross className="h-5 w-5" />
              </button>
            </div>
            <div className="h-[90%] p-4">
              <div className="relative mb-3">
                <Search />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <TextWidget />
                <CardWidget />
                <AreaChartWidget />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
