'use client'

import Editor, { OnMount } from '@monaco-editor/react'
import * as React from 'react'
import { Sources } from './sources'
import { Run } from './run'
import { useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { editorAtom, queryAtom } from '../state'
import { executeQuery } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { format } from 'sql-formatter'
import { Format } from '@/icons'

function CodeEditor() {
  const editorRef = React.useRef<Parameters<OnMount>[0]>()
  const set = useSetAtom(editorAtom)
  const setQuery = useSetAtom(queryAtom)

  const execute = React.useCallback(async () => {
    const query = editorRef.current?.getValue()
    if (!query || query.trim() === '') return
    const { data, error, columns, executionTime } = await executeQuery(
      query.trim(),
    )
    set({ query, data, error, columns, executionTime })
  }, [set])

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const handleOnChange = useDebouncedCallback((value?: string) => {
    setQuery(value || '')
  }, 600)

  const formatQuery = React.useCallback(() => {
    const query = editorRef.current?.getValue()
    if (!query || query.trim() === '') return
    const formattedQuery = format(query, {
      language: 'postgresql',
      tabWidth: 2,
      keywordCase: 'upper',
    })
    editorRef.current?.setValue(formattedQuery)
  }, [])

  return (
    <>
      <div className="flex h-14 w-full items-center gap-2 border-b px-6">
        <h1 className="flex-1">query-name</h1>
        <Button onClick={formatQuery} variant="outline" className="h-8 px-2">
          <Format className="h-5 w-5" />
        </Button>
        <Sources />
        <Run executionHandler={execute} />
      </div>
      <Editor
        height="90%"
        language="sql"
        theme="vs-light"
        className="pr-4"
        options={{
          fontSize: 15,
          minimap: {
            enabled: false,
          },
        }}
        onMount={handleEditorDidMount}
        onChange={handleOnChange}
      />
    </>
  )
}

export default React.memo(CodeEditor)
