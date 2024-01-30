import Link from 'next/link'
import { Dashboard } from '@/icons'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logout } from './logout'
import { getUser } from '@/lib/actions'
import { ActiveLink } from './active-link'

export async function Header() {
  const { user } = await getUser()
  return (
    <header className="flex h-14 w-full items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Dashboard className="h-6 w-6" />
        </Link>
        <nav className="flex gap-2">
          <ActiveLink href="/dashboard">Home</ActiveLink>
          <ActiveLink href="/integrations">Integrations</ActiveLink>
        </nav>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>{'cn'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold">Logged in as</p>
              <p
                className="text-xs leading-none text-slate-600"
                data-testid="user-email"
              >
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Logout />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
