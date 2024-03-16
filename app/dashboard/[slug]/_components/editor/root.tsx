'use client'

import { EditorPanel } from './_components/editor-panel'
import { useAtomValue } from 'jotai'
import { PanelBottom } from '@/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Queries } from './_components/queries'
import { CreateNewQuery } from './_components/create-new-query'
import { QueryMenu } from './_components/query-menu'
import { queriesAtom } from './state'

export function Editor({ isOpen }: { isOpen: boolean }) {
  const queries = useAtomValue(queriesAtom)

  return (
    <>
      {isOpen && (
        <div className="absolute bottom-0 z-50 block h-[360px] w-full border-t bg-white shadow-[0px_-2px_5px_-3px_rgba(0,0,0,0.1)]">
          <div className="flex h-9 w-full items-center border-b px-2">
            <div className="flex w-[85%] items-center">
              <CreateNewQuery />
              <div className="ml-2 h-9 w-px bg-slate-200" />
              <QueryMenu />
              <div className="h-9 w-px bg-slate-200" />
              <Queries />
            </div>

            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-auto p-1">
                    <PanelBottom className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Toggle editor</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {queries.length > 0 ? (
            <EditorPanel />
          ) : (
            <div className="flex h-full w-full justify-center bg-slate-50 py-8">
              <div className="flex h-[80%] w-[80%] items-center justify-center rounded-md border-2 border-dashed">
                <p className="text-gray-500">You don&apos;t have any queries</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
