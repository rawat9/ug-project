import { Publish } from './publish'
import { Logo } from '@/icons'
import Link from 'next/link'
import { ToolbarTitle } from './toolbar-title'
import { getDashboardById } from '@/lib/data/server/dashboard'
import { notFound } from 'next/navigation'
import { Preview } from './preview'
import { currentUser } from '@clerk/nextjs'

export async function Toolbar({ id }: { id: string }) {
  const dashboard = await getDashboardById(id)
  const user = await currentUser()

  if (!dashboard) {
    notFound()
  }

  return (
    <header className="fixed top-0 z-30 flex h-14 w-full items-center border-b bg-white px-4">
      <div className="flex h-full w-full items-center justify-between">
        <div className="flex h-8 items-center gap-3">
          <Link href="/dashboard" className="flex">
            <Logo className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <div className="flex items-center">
              <ToolbarTitle id={dashboard.id} title={dashboard.title} />
            </div>
            <p className="text-xs text-gray-400">{dashboard.description}</p>
          </div>
        </div>
        {user?.id === dashboard.user_id && (
          <div className="flex items-center justify-end gap-2">
            <Preview />
            <Publish
              id={dashboard.id}
              isDashboardPublished={dashboard.is_published}
            />
          </div>
        )}
      </div>
    </header>
  )
}
