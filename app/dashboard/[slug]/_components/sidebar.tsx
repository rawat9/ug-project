'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { CodeEditor, Settings } from '@/icons'
import { Component } from '@/icons/widgets/Component'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function Sidebar() {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  return (
    <aside className="fixed z-20 flex">
      <div className="flex h-screen w-12 flex-col items-center overflow-y-auto border-r bg-white py-8 dark:border-gray-700 dark:bg-gray-900">
        <nav className="flex flex-1 flex-col justify-center gap-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (searchParams.get('widgets') === 'true') {
                      params.delete('widgets')
                    } else {
                      params.set('widgets', 'true')
                    }
                    replace(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    })
                  }}
                  className="rounded-lg bg-blue-100 p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <Component />
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
                  className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <CodeEditor className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <div className="flex flex-col">
          <button className="rounded-lg p-1.5 text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:text-gray-200">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </aside>
  )
}
