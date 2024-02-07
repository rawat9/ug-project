import { Skeleton } from '@/components/ui/skeleton'

export function DashboardsListSkeleton() {
  return (
    <div className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="min-h-[150px] rounded-lg p-4"
        ></Skeleton>
      ))}
    </div>
  )
}
