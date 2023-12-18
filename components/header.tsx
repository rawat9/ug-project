import Link from 'next/link'
import { Dashboard } from '@/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
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
  )
}
