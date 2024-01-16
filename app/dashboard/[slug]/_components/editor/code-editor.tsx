'use client'

import Editor, { OnMount } from '@monaco-editor/react'
import { useCallback, useRef, useState } from 'react'
import { Sources } from './_components/sources'
import Run from './_components/run'
import { useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { editorAtom } from './state'
import { executeQuery } from '@/lib/data'

function CodeEditor() {
  const editorRef = useRef<Parameters<OnMount>[0]>()
  const set = useSetAtom(editorAtom)

  const execute = useCallback(async () => {
    const query = editorRef.current?.getValue()
    if (!query) return

    // const result = [
    //   {
    //     id: '306024ac-a948-4711-8516-51d3ce58f2df',
    //     created_at: '2023-12-19T20:11:19.623Z',
    //     title: 'Weather dashboard',
    //     user_id: 'f3b0a86f-fecc-4d49-9bd0-4b625c35aa77',
    //   },
    //   {
    //     id: 'ffac6e8e-76a4-47cf-a36b-273f4cd16f8f',
    //     created_at: '2023-12-19T20:44:42.394Z',
    //     title: 'Analytics',
    //     user_id: 'f3b0a86f-fecc-4d49-9bd0-4b625c35aa77',
    //   },
    //   {
    //     id: '2c6bbbda-bddf-4697-b84c-39912f3d46a9',
    //     created_at: '2023-12-20T13:12:09.118Z',
    //     title: '',
    //     user_id: null,
    //   },
    //   {
    //     id: '58cd434f-5c9a-4aaa-bb5a-407227a09dab',
    //     created_at: '2023-12-24T22:58:21.000Z',
    //     title: 'Brand new',
    //     user_id: 'f3b0a86f-fecc-4d49-9bd0-4b625c35aa77',
    //   },
    //   {
    //     id: 'ef101197-112f-45d3-9680-3ff0b8c12144',
    //     created_at: '2023-12-24T12:12:47.936Z',
    //     title: 'super dashboard123',
    //     user_id: 'f3b0a86f-fecc-4d49-9bd0-4b625c35aa77',
    //   },
    //   {
    //     id: '479a605b-7d07-42e8-b64d-363fbf2af345',
    //     created_at: '2023-12-24T12:11:11.846Z',
    //     title: 'nice_dashboard',
    //     user_id: 'f3b0a86f-fecc-4d49-9bd0-4b625c35aa77',
    //   },
    // ]

    const { data, error, executionTime } = await executeQuery(query)
    set((prev) => ({ ...prev, result: data, error, executionTime }))
  }, [set])

  const handleEditorDidMount: OnMount = (editor, monaco) => {
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
