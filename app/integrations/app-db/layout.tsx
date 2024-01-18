import { Dashboard } from '@/icons'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed w-full bg-zinc-50">
        <div className="flex h-14 items-center px-4">
          <Link href="/">
            <Dashboard className="h-6 w-6" />
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
                <span>App database</span>
              </li>
            </ol>
          </nav>
        </div>
        {children}
      </div>
    </>
  )
}
