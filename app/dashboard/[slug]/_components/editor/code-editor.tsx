'use client'

import CodeMirror from '@uiw/react-codemirror'
import { StandardSQL, sql } from '@codemirror/lang-sql'
import { disableGrammarly } from '@/lib/utils'

const extensions = [sql({ dialect: StandardSQL })]

export function CodeEditor() {
  return (
    <CodeMirror
      height="200px"
      extensions={extensions}
      theme="light"
      className="overflow-auto rounded-lg border border-gray-200 text-left shadow-sm"
      placeholder={'Start typing your query...'}
      onCreateEditor={() => disableGrammarly()}
    />
  )
}
