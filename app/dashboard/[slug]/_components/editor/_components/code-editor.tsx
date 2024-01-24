'use client'

import Editor, { OnMount } from '@monaco-editor/react'
import * as React from 'react'
import { Sources } from './sources'
import { Run } from './run'
import { useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { editorAtom, queryAtom } from '../state'
import { executeQuery } from '@/lib/data'

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

  return (
    <>
      <div className="flex h-14 w-full items-center gap-2 border-b px-4">
        <h1 className="flex-1">query-name</h1>
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
