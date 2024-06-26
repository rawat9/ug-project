'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from '@/icons'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.back()}
      variant={'ghost'}
      className="absolute left-4 top-4 md:left-8 md:top-8"
    >
      <ChevronLeft className="mr-2 h-4 w-4 text-gray-400" />
      Back
    </Button>
  )
}
