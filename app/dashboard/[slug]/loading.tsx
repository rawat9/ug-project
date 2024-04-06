'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { useSelectedLayoutSegment } from 'next/navigation'

export default function Loading() {
  const segment = useSelectedLayoutSegment()

  return (
    <>
      <header className="fixed top-0 z-10 flex h-14 w-full items-center gap-3 border-b bg-white px-4">
        <Skeleton className="h-8 w-8 bg-slate-500/10" />
        <Skeleton className="h-8 w-36 delay-500" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-8 w-20 bg-slate-500/10" />
          <Skeleton className="h-8 w-20 bg-slate-500/10" />
        </div>
      </header>
      {segment === 'edit' && (
        <aside className="flex h-screen w-12 flex-col items-center border-r py-8">
          <nav className="flex flex-1 flex-col justify-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 bg-slate-600/10" />
            ))}
          </nav>
        </aside>
      )}
    </>
  )
}
