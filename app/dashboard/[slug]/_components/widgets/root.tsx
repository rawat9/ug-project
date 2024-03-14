import Search from '@/components/shared/search'
import { TextWidget } from './_components/text-widget'
import { CardWidget } from './_components/card-widget'
import { AreaChartWidget } from './_components/area-chart-widget'
import { Cross } from '@/icons'

export function Widgets({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div className="h-full">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-md font-semibold">Widgets</h2>
        <button
          className="text-gray-400 hover:text-gray-600"
          onClick={onCollapse}
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
  )
}
