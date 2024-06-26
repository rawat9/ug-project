'use client'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CodeEditor, Settings, Widget, State, Delete } from '@/icons'
import { cn } from '@/lib/utils'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { DeleteAlertDialog } from './delete-alert-dialog'
import { deleteDashboard } from '@/lib/data/server/dashboard'

export function Sidebar() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const { slug } = useParams()

  const handleDashboardDelete = async () => {
    if (!slug) return
    await deleteDashboard(slug as string)
    replace('/')
  }

  return (
    <aside className="fixed z-20 flex">
      <div className="flex h-screen w-12 flex-col items-center border-r py-8 dark:border-gray-700 dark:bg-gray-900">
        <nav className="flex flex-1 flex-col justify-center gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (searchParams.get('widgets') === 'true') {
                      params.delete('widgets')
                    } else if (searchParams.get('state') === 'true') {
                      params.delete('state')
                      params.set('widgets', 'true')
                    } else {
                      params.set('widgets', 'true')
                    }
                    replace(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    })
                  }}
                  className={cn(
                    'self-center rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800',
                    searchParams.get('widgets') === 'true' && 'bg-gray-100',
                  )}
                >
                  <Widget className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Widgets</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (searchParams.get('editor') === 'true') {
                      params.delete('editor')
                    } else {
                      params.set('editor', 'true')
                    }
                    replace(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    })
                  }}
                  className={cn(
                    'self-center rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800',
                    searchParams.get('editor') === 'true' && 'bg-gray-100',
                  )}
                >
                  <CodeEditor className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (searchParams.get('state') === 'true') {
                      params.delete('state')
                    } else if (searchParams.get('widgets') === 'true') {
                      params.delete('widgets')
                      params.set('state', 'true')
                    } else {
                      params.set('state', 'true')
                    }
                    replace(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    })
                  }}
                  className={cn(
                    'self-center rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800',
                    searchParams.get('state') === 'true' && 'bg-gray-100',
                  )}
                >
                  <State className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>State</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <div className="flex flex-col">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-gray-200">
                      <Settings className="h-6 w-6" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" sideOffset={10}>
                    <DropdownMenuItem
                      className="cursor-pointer font-medium text-red-500"
                      asChild
                    >
                      <DeleteAlertDialog onDelete={handleDashboardDelete} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  )
}
