import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Logo } from '@/icons'

export function Header() {
  return (
    <header className="border-transparent-white fixed left-0 top-0 z-10 w-full backdrop-blur-[12px]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center justify-center">
          <Logo className="mr-2 h-5 w-5" />
          <h1 className="pt-1 font-logo text-2xl">dashgen</h1>
        </Link>
        <div className="flex gap-2">
          <Link
            href="/auth/sign-in"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'rounded-full bg-white',
            )}
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'rounded-full',
            )}
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}
