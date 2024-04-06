'use client'

import { ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { useAtom, useSetAtom } from 'jotai'
import CodeEditor from './code-editor'
import { activeQueryAtom, editorAtom, queriesAtom, queryAtom } from '../state'
import { QueryResultTable } from './query-result-table'
import { ImperativePanelHandle } from 'react-resizable-panels'
import { SchemaViewer } from './schema-viewer'
import { Delete, Format } from '@/icons'
import { Button } from '@/components/ui/button'
import { Sources } from './sources'
import { Run } from './run'
import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import { format } from 'sql-formatter'
import { executeQuery, fetchSchema } from '@/lib/data'

import * as React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { QueryName } from './query-name'
import { deleteQuery, updateQuery } from '@/lib/data/client/queries'
import type { Tables } from '@/types/database'
import type { TableSchema } from '@/types'
import toast from 'react-hot-toast'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { fetchIntegrations } from '@/lib/data/client/integrations'

export function EditorPanel() {
  const queryClient = useQueryClient()
  const [queryResult, set] = useAtom(editorAtom)
  const { data, error, columns } = queryResult
  // const resultPanelRef = React.useRef<ImperativePanelHandle>(null)
  const codeEditorRef = React.useRef<ReactCodeMirrorRef>(null)
  const [queries, setQueries] = useAtom(queriesAtom)
  const [activeQuery, setActiveQuery] = useAtom(activeQueryAtom)
  const setQuery = useSetAtom(queryAtom(activeQuery?.name ?? ''))
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [schema, setSchema] = React.useState<TableSchema[]>([])

  const { data: integrations } = useQuery({
    queryKey: ['integrations'],
    queryFn: fetchIntegrations,
    select: (it) => it.data,
    retry: 3,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteQuery,
    onSuccess: (_, id) => {
      // update state
      setQueries((prev) => prev.filter((query) => query.id !== id))
      const activeIndex = queries.findIndex((query) => query.id === id)

      if (queries.length - 1 === activeIndex) {
        setActiveQuery(queries[activeIndex - 1] ?? null)
      } else {
        setActiveQuery(queries[activeIndex + 1] ?? null)
      }

      queryClient.invalidateQueries({ queryKey: ['queries'] })
    },
    onError: () => {
      return toast.error('Error deleting query', {
        position: 'top-center',
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateQuery,
    onSuccess: (_, variables) => {
      // update state
      setQueries((prev) =>
        prev.map((query) =>
          query.id === variables.id
            ? { ...query, [variables.key]: variables.value }
            : query,
        ),
      )
      setActiveQuery(
        (prev) =>
          ({ ...prev, [variables.key]: variables.value }) as Tables<'query'>,
      )
      queryClient.invalidateQueries({ queryKey: ['queries'] })
    },
    onError: () => {
      return toast.error('Error updating query', {
        position: 'top-center',
      })
    },
  })

  const columnDef = React.useMemo(() => {
    return columns.map((column) => ({
      header: column.name,
      accessorKey: column.name,
    }))
  }, [columns])

  const formatQuery = () => {
    const query = codeEditorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return

    const formattedQuery = format(query, {
      language: 'postgresql',
      tabWidth: 2,
      keywordCase: 'upper',
      paramTypes: { custom: [{ regex: String.raw`\{\{\s*[\w\.,]+\s*\}\}` }] }, // TODO: complete this
    })

    setQuery(formattedQuery)
  }

  const handleRename = (name: string) => {
    if (!activeQuery) return
    updateMutation.mutate({ id: activeQuery.id, key: 'name', value: name })
  }

  const handleSetIntegration = async (integrationId: string) => {
    if (!activeQuery) return
    updateMutation.mutate({
      id: activeQuery.id,
      key: 'integration_id',
      value: integrationId,
    })

    const encryptedConnectionString = integrations?.find(
      (integration) => integration.id === integrationId,
    )?.conn_string

    if (!encryptedConnectionString) {
      toast.error('Unable to update the schema. No connection string found', {
        position: 'top-center',
      })
      return
    }

    const { data } = await fetchSchema(encryptedConnectionString)
    setSchema(data)
  }

  const handleDelete = () => {
    if (!activeQuery) return
    deleteMutation.mutate(activeQuery.id)
  }

  const execute = async () => {
    const query = codeEditorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return
    if (!activeQuery) return
    if (!integrations?.length) {
      toast.error('No integrations found', {
        position: 'top-center',
      })
      return
    }

    const encryptedConnectionString = integrations.find(
      (integration) => integration.id === activeQuery.integration_id,
    )?.conn_string

    if (!encryptedConnectionString) {
      toast.error('No connection string found', {
        position: 'top-center',
      })
      return
    }

    // save the query before running
    updateMutation.mutate({
      id: activeQuery?.id,
      key: 'sql_query',
      value: query,
    })

    const { data, error, columns, executionTime } = await executeQuery(
      query.trim(),
      encryptedConnectionString,
    )
    set({ query, data, error, columns, executionTime })

    // switch to the result panel
    setCurrentIndex(1)
  }

  React.useEffect(() => {
    async function loadSchema() {
      const integrationId = activeQuery?.integration_id

      if (!integrationId) {
        return
      }

      const encryptedConnectionString = integrations?.find(
        (integration) => integration.id === activeQuery.integration_id,
      )?.conn_string

      if (!encryptedConnectionString) {
        return
      }

      const { data } = await fetchSchema(encryptedConnectionString)
      setSchema(data)
    }
    loadSchema()
  }, [integrations, activeQuery?.integration_id])

  return (
    <>
      <ResizablePanel id="editor" order={2} defaultSize={55}>
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
                    onClick={handleDelete}
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
            <Sources
              selectedIntegrationId={activeQuery?.integration_id}
              integrations={integrations ?? []}
              handleSelectChange={handleSetIntegration}
            />
            <Run executionHandler={execute} />
          </div>
        </div>
        <div className="h-full" id="code-editor">
          <CodeEditor ref={codeEditorRef} />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        id="schema-viewer"
        minSize={20}
        maxSize={40}
        defaultSize={30}
        order={3}
      >
        <TabGroup
          className="h-full"
          index={currentIndex}
          onIndexChange={setCurrentIndex}
        >
          <TabList variant="line">
            <Tab className="ui-selected:border-slate-600 ui-selected:text-slate-800">
              Schema
            </Tab>
            <Tab className="ui-selected:border-slate-600 ui-selected:text-slate-800">
              Output
            </Tab>
          </TabList>
          <TabPanels className="h-full">
            <TabPanel className="h-full p-2">
              <SchemaViewer schema={schema} />
            </TabPanel>
            <TabPanel className="mt-0 h-full w-full">
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
              ) : !data.length ? (
                <div className="flex h-44 items-center justify-center p-4">
                  <p className="text-center text-sm text-slate-500">
                    Run a query to see the output
                  </p>
                </div>
              ) : (
                <QueryResultTable columns={columnDef} data={data} />
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ResizablePanel>
    </>
  )
}
