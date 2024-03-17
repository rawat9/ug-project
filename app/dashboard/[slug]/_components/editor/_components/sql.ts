import { CompletionContext, CompletionResult } from '@codemirror/autocomplete'

export const getExtension = (
  context: CompletionContext,
): CompletionResult | null => {
  let word = context.matchBefore(/\{\{\s*\w+\s*/)

  console.log('word', word)
  console.log('context', context)
  if (word === null || word.from === word.to) return null
  console.log('HERE')
  return {
    from: word.from,
    options: [
      {
        label: '{{anurag}}',
        displayLabel: 'anurag',
        apply: 'nice',
        type: 'keyword',
      },
      { label: '{{ hello }}', type: 'variable', info: '()' },
      { label: 'magic', type: 'method', apply: '⠁⭒*.✩.*⭒⠁', detail: 'macro' },
    ],
  }
}
