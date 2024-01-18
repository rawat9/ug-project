'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type ActiveLinkProps = {
  href: '/dashboard' | '/integrations'
  children: string
}

export function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname()
  const active = 'relative bottom-0 top-[15px] block border-b-2 border-black'

  return (
    <Link
      href={href}
      className="px-2 py-1 text-gray-900 hover:rounded-md hover:bg-gray-100"
    >
      {children}
      {pathname === href ? (
        <div className={pathname === href ? active : ''} />
      ) : null}
    </Link>
  )
}
