import { CanvasLoadingSpinner } from '@/icons/CanvasLoadingSpinner'

export function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full touch-none flex-col items-center justify-center gap-2 bg-white/60">
      <CanvasLoadingSpinner className="h-6 w-6" />
      <p>Loading...</p>
    </div>
  )
}
