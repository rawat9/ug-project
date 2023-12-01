import { buttonVariants } from '@/components/ui/button'
import { Dashboard, Login } from '@/icons'
import Link from 'next/link'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex max-w-screen-lg px-4 mx-auto h-16 items-center justify-between">
          <Link
            href="/"
            className={'font-bold text-xl flex items-center gap-2'}
          >
            DashCMS
            <Dashboard className="w-5 h-5" />
          </Link>
          <Link
            href={'/login'}
            className={buttonVariants({ variant: 'default' })}
          >
            Login
            <Login className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
