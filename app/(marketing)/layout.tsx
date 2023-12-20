import { buttonVariants } from '@/components/ui/button'
import { Dashboard, Login } from '@/icons'
import Link from 'next/link'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-screen-lg items-center justify-between px-4">
          <Link
            href="/"
            className={'flex items-center gap-2 text-xl font-bold'}
          >
            DashCMS
            <Dashboard className="h-5 w-5" />
          </Link>
          <Link
            href={'/auth/login'}
            className={buttonVariants({ variant: 'default' })}
          >
            Login
            <Login className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
