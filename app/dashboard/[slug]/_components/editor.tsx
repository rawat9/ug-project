'use client'

import CodeMirror from '@uiw/react-codemirror'
import { MySQL, sql } from '@codemirror/lang-sql'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import { Run } from '@/icons'

export function Editor() {
  // const el = document.getElementsByClassName('cm-content')[0]
  // el.setAttribute('data-enable-grammarly', false)

  return (
    <div className="h-full w-full rounded-lg bg-slate-100">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel minSize={20} defaultSize={20} order={1}>
          <div className="flex h-full w-full justify-center rounded-lg bg-white">
            <h1>Queries</h1>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-slate-100 p-1" />

        <ResizablePanel order={2} defaultSize={60}>
          <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-white">
            <div className="flex h-12 w-full items-center gap-2 border-b px-4">
              <h1 className="flex-1">query1</h1>
              <Button variant={'outline'} size={'sm'} className="text-sm">
                <Run className="mr-2 h-3 w-3" />
                Run
              </Button>
            </div>

            <div className="px-4">
              <CodeMirror
                height="200px"
                extensions={[sql({ dialect: MySQL })]}
                theme={'light'}
                className="overflow-auto rounded-lg border border-gray-200 text-left text-base shadow-sm"
                value="SELECT * FROM `users` WHERE `id` = 1;"
              />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle className="bg-slate-100 p-1" />

        <ResizablePanel minSize={20} defaultSize={20} order={3}>
          <div className="flex h-full w-full justify-center rounded-lg bg-white">
            <h1>Schema viewer</h1>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
