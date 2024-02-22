import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from '@/icons'
import { cn } from '@/lib/utils'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <SignUp />
    </div>
  )
}
