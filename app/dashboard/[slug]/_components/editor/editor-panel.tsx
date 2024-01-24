'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useAtomValue } from 'jotai'
import CodeEditor from './_components/code-editor'
import { editorAtom } from './state'
import { QueryResultTable } from './_components/query-result-table'
import { ImperativePanelHandle } from 'react-resizable-panels'
import * as React from 'react'

export function EditorPanel() {
  const queryResult = useAtomValue(editorAtom)
  const { data, error, columns, executionTime } = queryResult
  const resultPanelRef = React.useRef<ImperativePanelHandle>(null)

  const columnDef = React.useMemo(() => {
    return columns.map((column) => ({
      header: column,
      accessorKey: column,
    }))
  }, [columns])

  React.useEffect(() => {
    if ((data.length > 0 || error) && resultPanelRef.current?.isCollapsed()) {
      resultPanelRef.current?.resize(50)
    }
  }, [data, error])

  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel id="code-editor" minSize={50} defaultSize={100} order={1}>
        <CodeEditor />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        id="result"
        order={2}
        defaultSize={0}
        minSize={30}
        ref={resultPanelRef}
        style={{ overflow: 'auto' }}
        collapsible
      >
        <div className="sticky top-0 z-20 flex h-8 w-full items-center gap-2 border-b bg-white px-4">
          <h1 className="text-sm font-semibold text-slate-600">Result</h1>
          <p className="ml-auto text-xs text-slate-600">
            Ran successfully in {executionTime} ms
          </p>
        </div>
        {error ? (
          <div className="flex flex-col gap-1 p-4">
            <h1 className="text-sm text-slate-600">ERROR: {error.message}</h1>
            <h1 className="text-sm text-slate-600">LINE: {error.position}</h1>
            {error.hint && (
              <h1 className="text-sm text-slate-600">HINT: {error.hint}</h1>
            )}
          </div>
        ) : (
          <QueryResultTable columns={columnDef} data={data} />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
