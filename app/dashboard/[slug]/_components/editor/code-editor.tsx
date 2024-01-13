'use client'

import { disableGrammarly } from '@/lib/utils'
import Editor, { OnMount } from '@monaco-editor/react'

export function CodeEditor() {
  return (
    <Editor
      height="200px"
      language="sql"
      theme="vs-light"
      defaultValue="-- Write your query"
      className="border-gray-200 text-lg"
      options={{
        fontSize: 15,
        minimap: {
          enabled: false,
        },
      }}
    />
  )
}
