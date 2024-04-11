'use client'

import * as React from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { useDebouncedCallback } from 'use-debounce'
import { activeQueryAtom, queryAtom } from '../state'

import ReactCodeMirror, {
  ReactCodeMirrorRef,
  ReactCodeMirrorProps,
  keymap,
} from '@uiw/react-codemirror'
import { getExtension } from './sql'
import { disableGrammarly } from '@/lib/utils'
import { acceptCompletion, completionStatus } from '@codemirror/autocomplete'

const CodeEditor = React.forwardRef<ReactCodeMirrorRef, ReactCodeMirrorProps>(
  (_, ref) => {
    const activeQuery = useAtomValue(activeQueryAtom)
    const setQuery = useSetAtom(queryAtom(activeQuery?.name ?? ''))

    const handleOnChange = useDebouncedCallback((value: string) => {
      setQuery(value)
    }, 800)

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
            // keymap.of([
            //   {
            //     key: 'Tab',
            //     preventDefault: true,
            //     shift: indentLess,
            //     run: (editor) => {
            //       if (!completionStatus(editor.state)) return indentMore(e);
            //       return acceptCompletion(editor)
            //     },
            //   },
            // ]),
            getExtension(),
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
