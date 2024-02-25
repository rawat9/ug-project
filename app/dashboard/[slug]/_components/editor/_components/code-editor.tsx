'use client'

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

import { ReactCodeMirrorRef } from '@uiw/react-codemirror'
import CodeMirrorWrapper from './code-mirror-wrapper'

function CodeEditor() {
  const editorRef = React.useRef<ReactCodeMirrorRef>(null)
  const set = useSetAtom(editorAtom)
  const setQuery = useSetAtom(queryAtom)

  const execute = React.useCallback(async () => {
    const query = editorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return
    const { data, error, columns, executionTime } = await executeQuery(
      query.trim(),
    )
    set({ query, data, error, columns, executionTime })
  }, [set])

  const handleOnChange = useDebouncedCallback((value?: string) => {
    setQuery(value || '')
  }, 600)

  const formatQuery = () => {
    const query = editorRef.current?.view?.state.doc.toString()
    if (!query || query.trim() === '') return

    const formattedQuery = format(query, {
      language: 'postgresql',
      tabWidth: 2,
      keywordCase: 'upper',
    })
    editorRef.current?.view?.dispatch({
      changes: {
        from: 0,
        to: editorRef.current?.view?.state.doc.length,
        insert: formattedQuery,
      },
    })
  }

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
      <CodeMirrorWrapper
        editorRef={editorRef}
        handleOnChange={handleOnChange}
      />
    </>
  )
}

export default CodeEditor
