import Link from 'next/link'
import { Dashboard } from '@/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Header() {
  return (
    <header className="fixed flex h-16 w-full items-center justify-between border-b bg-white px-4">
      <Link href="/" className={'flex text-xl font-bold'}>
        <Dashboard className="h-5 w-5" />
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
