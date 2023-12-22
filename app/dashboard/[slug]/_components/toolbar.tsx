import { Share } from './share'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Dashboard, Pencil } from '@/icons'
import Link from 'next/link'

export function Toolbar() {
  return (
    <header className="fixed top-0 z-10 flex h-14 w-full items-center border-b bg-white px-4">
      <div className="grid h-full w-full grid-cols-3 gap-2">
        <Link href="/dashboard" className="flex items-center justify-start">
          <Dashboard className="h-5 w-5" />
        </Link>
        <div className="flex items-center justify-center gap-2">
          <h3 className="max-w-xs truncate font-medium">
            Weather Forecast Dashboard
          </h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Pencil className="h-4 w-4 text-slate-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button variant={'secondary'}>Preview</Button>
          <Share />
        </div>
      </div>
    </header>
  )
}
