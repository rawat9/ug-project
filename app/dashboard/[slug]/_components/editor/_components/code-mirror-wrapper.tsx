import ReactCodeMirror, {
  ReactCodeMirrorProps,
  ReactCodeMirrorRef,
} from '@uiw/react-codemirror'
import * as React from 'react'
import { PostgreSQL, sql } from '@codemirror/lang-sql'
import { disableGrammarly } from '@/lib/utils'
import { acceptCompletion, completionStatus } from '@codemirror/autocomplete'
import { keymap } from '@uiw/react-codemirror'
import { getExtension } from './sql'

interface Props {
  editorRef: React.MutableRefObject<ReactCodeMirrorRef | null>
  handleOnChange: ReactCodeMirrorProps['onChange']
}

function CodeMirrorWrapper(props: Props) {
  const dialect = PostgreSQL
  const extensions = [dialect.language.data.of({ autocomplete: getExtension })]

  return (
    <div className="flex items-center px-4 py-2">
      <ReactCodeMirror
        basicSetup={{
          autocompletion: true,
          bracketMatching: true,
          foldGutter: false,
        }}
        width="100%"
        height="100%"
        placeholder="Write your query here"
        className="h-[200px] w-[100%] rounded-md border shadow-sm"
        ref={props.editorRef}
        extensions={[
          keymap.of([
            {
              key: 'Enter',
              run: (e) => {
                console.log(completionStatus)
                return acceptCompletion(e)
              },
            },
          ]),
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
        onChange={props.handleOnChange}
        onCreateEditor={() => {
          disableGrammarly()
        }}
      />
    </div>
  )
}

export default React.memo(CodeMirrorWrapper)
