import { Share } from './share'
import { Button } from '@/components/ui/button'
import { Dashboard } from '@/icons'
import Link from 'next/link'
import { ToolbarTitle } from './toolbar-title'
import React, { FC } from 'react'

interface ToolbarComponent extends FC<{ children: React.ReactNode }> {
  Title: FC<{
    id: string
    title: string
  }>
}

const Toolbar: ToolbarComponent = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <header className="fixed top-0 z-30 flex h-14 w-full items-center border-b px-4">
      <div className="flex h-full w-full justify-between">
        <Link href="/dashboard" className="flex items-center justify-start">
          <Dashboard className="h-5 w-5" />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <>{children}</>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant={'secondary'}>Preview</Button>
          <Share />
        </div>
      </div>
    </header>
  )
}

Toolbar.Title = ToolbarTitle

export { Toolbar }
