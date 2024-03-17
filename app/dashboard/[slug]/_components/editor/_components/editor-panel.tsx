'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { useAtom } from 'jotai'
import CodeEditor from './code-editor'
import { activeQueryAtom, editorAtom, queriesAtom } from '../state'
import { QueryResultTable } from './query-result-table'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { SchemaViewer } from './schema-viewer'
import { Delete, Format } from '@/icons'
import { Button } from '@/components/ui/button'
import { Sources } from './sources'
import { Run } from './run'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { format } from 'sql-formatter'
import Mustache from 'mustache'
import { executeQuery } from '@/lib/data'

import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QueryName } from './query-name'
import { deleteQuery, fetchQueries, updateQuery } from '@/lib/data/queries'
import { Tables } from '@/types/database'
import { QuerySidebar } from './query-sidebar'
import toast from 'react-hot-toast'

export function EditorPanel() {
  const queryClient = useQueryClient()
  const [queryResult, set] = useAtom(editorAtom)
  const { data, error, columns, executionTime } = queryResult
  const resultPanelRef = React.useRef<ImperativePanelHandle>(null)
  const codeEditorRef = React.useRef<ReactCodeMirrorRef>(null)

  const deleteMutation = useMutation({
    mutationFn: deleteQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['queries'] }),
  })

  const updateMutation = useMutation({
    mutationFn: updateQuery,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['queries'] }),
  })

  const [queries, setQueries] = useAtom(queriesAtom)
  const [activeQuery, setActiveQuery] = useAtom(activeQueryAtom)

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
      paramTypes: { custom: [{ regex: String.raw`\{\{\s*[\w\.,]+\s*\}\}` }] }, // TODO: complete this
    })

    console.log(
      Mustache.render(formattedQuery, {
        user: { name: 'anurag', age: 7 },
        posts: { title: 'hello' },
      }),
    )

    codeEditorRef.current?.view?.dispatch({
      changes: {
        from: 0,
        to: codeEditorRef.current?.view?.state.doc.length,
        insert: formattedQuery,
      },
    })
  }

  const handleRename = (name: string) => {
    if (!activeQuery) return

    setQueries((prev) =>
      prev.map((query) =>
        query.id === activeQuery.id ? { ...query, name } : query,
      ),
    )
    setActiveQuery((prev) => ({ ...prev, name }) as Tables<'query'>)
    updateMutation.mutate({ id: activeQuery.id, key: 'name', value: name })
  }

  const handleRemove = () => {
    if (!activeQuery) return

    setQueries((prev) => prev.filter((query) => query.id !== activeQuery.id))
    const activeIndex = queries.findIndex(
      (query) => query.id === activeQuery.id,
    )

    if (queries.length - 1 === activeIndex) {
      setActiveQuery(queries[activeIndex - 1] ?? null)
    } else {
      setActiveQuery(queries[activeIndex + 1] ?? null)
    }
    deleteMutation.mutate(activeQuery.id)
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
      <ResizablePanel order={2} defaultSize={60}>
        <div className="flex p-5">
          <div className="flex flex-1 items-center">
            {activeQuery && (
              <QueryName name={activeQuery.name} onRenaming={handleRename} />
            )}
          </div>
          <div className="flex gap-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={formatQuery}
                    variant="ghost"
                    className="h-8 p-1"
                  >
                    <Format className="h-5 w-5 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Format query</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleRemove}
                    variant="ghost"
                    className="h-8 p-1"
                  >
                    <Delete className="h-5 w-5 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Delete query</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Sources />
            <Run executionHandler={execute} />
          </div>
        </div>
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
                  <h1 className="text-sm text-slate-600">HINT: {error.hint}</h1>
                )}
              </div>
            ) : (
              <QueryResultTable columns={columnDef} data={data} />
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={20} maxSize={40} defaultSize={20} order={3}>
        <SchemaViewer />
      </ResizablePanel>
    </>
  )
}
