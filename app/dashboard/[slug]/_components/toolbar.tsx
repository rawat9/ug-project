import { Share } from './share'
import { Button } from '@/components/ui/button'
import { Dashboard } from '@/icons'
import Link from 'next/link'
import { ToolbarTitle } from './toolbar-title'
import { Tables } from '@/types/database'

export function Toolbar({ dashboard }: { dashboard: Tables<'dashboard'> }) {
  return (
    <header className="fixed top-0 z-30 flex h-14 w-full items-center border-b bg-white px-4">
      <div className="grid h-full w-full grid-cols-3 gap-2">
        <Link href="/dashboard" className="flex items-center justify-start">
          <Dashboard className="h-5 w-5" />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <ToolbarTitle dashboard={dashboard} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant={'secondary'}>Preview</Button>
          <Share />
        </div>
      </div>
    </header>
  )
}
