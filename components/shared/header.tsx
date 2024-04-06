import Link from 'next/link'
import { Dashboard } from '@/icons'
import { ActiveLink } from './active-link'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex h-14 w-full items-center justify-between border-b bg-white px-4">
      <div className="flex items-center gap-10">
        <Link href="/">
          <Dashboard className="h-5 w-5" />
        </Link>
        <nav className="flex gap-2">
          <ActiveLink href="/dashboard">Home</ActiveLink>
          <ActiveLink href="/integrations">Integrations</ActiveLink>
        </nav>
      </div>
      <UserButton
        afterSignOutUrl="/auth/sign-in"
        appearance={{
          elements: {
            avatarBox: 'w-9 h-9',
          },
        }}
      />
    </header>
  )
}
