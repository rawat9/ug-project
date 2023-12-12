import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dashboard } from '@/icons'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col">
      <header className="flex max-w-full px-4 h-16 items-center justify-between border-b">
        <Link href="/" className={'font-bold text-xl flex items-center gap-2'}>
          <Dashboard className="w-5 h-5" />
        </Link>
        <Link href="/" className={'mr-auto pl-4'}>
          Integrations
        </Link>
        <Link href={'/'}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </header>
      <main className="bg-zinc-50 min-h-[calc(100vh_-_4rem)]">{children}</main>
    </div>
  )
}
