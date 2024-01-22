'use client'

import Editor from '@monaco-editor/react'

function CodeEditor() {
  return (
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
    />
  )
}

export default CodeEditor
