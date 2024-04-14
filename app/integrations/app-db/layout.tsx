import { Logo } from '@/icons'
import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Demo DB | Integrations | Dashgen',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed w-full bg-slate-50">
        <div className="flex h-12 items-center px-4">
          <Link href="/">
            <Logo className="h-5 w-5" />
          </Link>
          <nav className="ml-4" aria-label="breadcrumb">
            <ol className="inline-flex list-none gap-2 p-0">
              <li className="flex items-center">
                <Link href="/integrations">
                  <button className="text-gray-500 hover:text-gray-700">
                    Integrations
                  </button>
                </Link>
              </li>
              <span className="text-gray-300">/</span>
              <li className="flex items-center">
                <span>Demo database</span>
              </li>
            </ol>
          </nav>
        </div>
        {children}
      </div>
    </>
  )
}
