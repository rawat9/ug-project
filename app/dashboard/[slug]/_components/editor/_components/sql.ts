import { PostgreSQL, SQLConfig, sql } from '@codemirror/lang-sql'
import { getDefaultExtensions } from '@uiw/react-codemirror'

// TODO: Implement custom auto-completion logic
// export const getExtension = (
//   context: CompletionContext,
// ): CompletionResult | null => {
//   let word = context.matchBefore(/\{\{\s*\w+\s*/)

//   if (word === null || word.from === word.to) return null

//   return {
//     from: word.from,
//     options: [
//       {
//         label: '{{anurag}}',
//         displayLabel: 'anurag',
//         apply: 'nice',
//         type: 'keyword',
//       },
//       { label: '{{ hello }}', type: 'variable', info: '()' },
//       { label: 'magic', type: 'method', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
//     ],
//   }
// }

export function getExtension() {
  const config = {
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
  } satisfies SQLConfig

  try {
    return sql(config)
  } catch {}

  return getDefaultExtensions()
}
