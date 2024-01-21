'use client'

import Editor, { OnMount } from '@monaco-editor/react'
import { useCallback, useRef } from 'react'
import { Sources } from './_components/sources'
import Run from './_components/run'
import { useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { editorAtom, showQueryResultAtom } from './state'
import { executeQuery } from '@/lib/data'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

function CodeEditor() {
  const editorRef = useRef<Parameters<OnMount>[0]>()
  const set = useSetAtom(editorAtom)
  const toggle = useSetAtom(showQueryResultAtom)

  const execute = useCallback(async () => {
    const query = editorRef.current?.getValue()
    if (!query || query.trim() === '') return
    const { data, error, executionTime } = await executeQuery(query.trim())
    if (error) {
      set((prev) => ({ ...prev, error, executionTime }))
    }
    set((prev) => ({ ...prev, data, executionTime }))
    toggle(true)
  }, [set, toggle])

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor
  }

  const handleOnChange = useDebouncedCallback((value?: string) => {
    set((prev) => ({ ...prev, query: value || '' }))
  }, 500)

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
        defaultValue="-- Write your query"
        className="px-4"
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

export default CodeEditor
