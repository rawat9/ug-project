'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useAtom } from 'jotai'
import CodeEditor from './_components/code-editor'
import { editorAtom } from './state'
import { QueryResultTable } from './_components/query-result-table'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { SchemaViewer } from './schema-viewer'
import { Format } from '@/icons'
import { Button } from '@/components/ui/button'
import { Sources } from './_components/sources'
import { Run } from './_components/run'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { format } from 'sql-formatter'
import { executeQuery } from '@/lib/data'

import * as React from 'react'

export function EditorPanel() {
  const [queryResult, set] = useAtom(editorAtom)
  const { data, error, columns, executionTime } = queryResult
  const resultPanelRef = React.useRef<ImperativePanelHandle>(null)
  const codeEditorRef = React.useRef<ReactCodeMirrorRef>(null)

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

  const formatQuery = () => {
    const query = codeEditorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return

    const formattedQuery = format(query, {
      language: 'postgresql',
      tabWidth: 2,
      keywordCase: 'upper',
    })
    codeEditorRef.current?.view?.dispatch({
      changes: {
        from: 0,
        to: codeEditorRef.current?.view?.state.doc.length,
        insert: formattedQuery,
      },
    })
  }

  const execute = React.useCallback(async () => {
    const query = codeEditorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return
    const { data, error, columns, executionTime } = await executeQuery(
      query.trim(),
    )
    set({ query, data, error, columns, executionTime })
  }, [set, codeEditorRef])

  return (
    <>
      <div className="flex h-14 w-full items-center gap-2 border-b px-4">
        <h1 className="flex-1">query-name</h1>
        <Button onClick={formatQuery} variant="outline" className="h-8 px-2">
          <Format className="h-5 w-5" />
        </Button>
        <Sources />
        <Run executionHandler={execute} />
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel order={1} defaultSize={70}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel
              id="code-editor"
              minSize={50}
              defaultSize={100}
              order={1}
            >
              <CodeEditor ref={codeEditorRef} />
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
                  <h1 className="text-sm text-slate-600">
                    ERROR: {error.message}
                  </h1>
                  <h1 className="text-sm text-slate-600">
                    LINE: {error.position}
                  </h1>
                  {error.hint && (
                    <h1 className="text-sm text-slate-600">
                      HINT: {error.hint}
                    </h1>
                  )}
                </div>
              ) : (
                <QueryResultTable columns={columnDef} data={data} />
              )}
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel minSize={30} maxSize={40} defaultSize={30} order={2}>
          <SchemaViewer />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
