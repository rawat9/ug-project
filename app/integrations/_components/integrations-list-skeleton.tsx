import { Skeleton } from '@/components/ui/skeleton'

export function IntegrationsListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className="min-h-[100px] w-full rounded-lg p-4 shadow-sm"
        />
      ))}
    </div>
  )
}
