import Link from 'next/link'

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="flex container px-56 mx-auto h-16 items-center justify-between">
          <Link href="/login" className={'font-mono font-bold'}>
            DashCMS
          </Link>
          <Link href="/login" className={''}>
            Login
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
