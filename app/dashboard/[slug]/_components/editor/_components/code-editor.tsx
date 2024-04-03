'use client'

import * as React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { activeQueryAtom, queryAtom } from '../state'

import ReactCodeMirror, {
  ReactCodeMirrorRef,
  ReactCodeMirrorProps,
} from '@uiw/react-codemirror'
import { PostgreSQL, sql } from '@codemirror/lang-sql'
import { getExtension } from './sql'
import { disableGrammarly } from '@/lib/utils'

const CodeEditor = React.forwardRef<ReactCodeMirrorRef, ReactCodeMirrorProps>(
  (_, ref) => {
    const activeQuery = useAtomValue(activeQueryAtom)
    const setQuery = useSetAtom(queryAtom(activeQuery?.name ?? ''))

    const dialect = PostgreSQL
    const extensions = [
      dialect.language.data.of({ autocomplete: getExtension }),
    ]

    const handleOnChange = useDebouncedCallback((value: string) => {
      setQuery(value)
    }, 600)

    return (
      <div className="flex h-[60%] min-h-[200px] px-4">
        <ReactCodeMirror
          basicSetup={{
            autocompletion: true,
            bracketMatching: true,
            foldGutter: false,
          }}
          width="100%"
          height="100%"
          placeholder="Write your query here"
          className="w-full rounded-md border shadow-sm"
          value={activeQuery?.sql_query ?? ''}
          ref={ref}
          extensions={[
            sql({
              dialect: PostgreSQL,
              schema: {
                users: ['id', 'name', 'age'],
                posts: ['id', 'title', 'content'],
              },
              tables: [
                {
                  label: 'users',
                  type: 'class',
                  info: 'User table',
                  apply: 'users',
                },
                { label: 'posts', type: 'class', info: 'Post table' },
              ],
            }),
            extensions,
          ]}
          onChange={handleOnChange}
          onCreateEditor={() => {
            disableGrammarly()
          }}
        />
      </div>
    )
  },
)

CodeEditor.displayName = 'CodeEditor'
export default React.memo(CodeEditor)
