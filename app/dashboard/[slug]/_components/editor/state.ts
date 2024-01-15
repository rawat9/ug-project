import { atom } from 'jotai'

type EditorProps<TData extends unknown = unknown> = {
  query: string
  data: TData[]
}

export const queryResultAtom = atom((get) => {
  if (!get(editorAtom).data.length) return { columns: [], data: [] }
  const data = get(editorAtom).data
  const first = data[0] as { [key: string]: unknown }
  const columns = Object.keys(first).map((key) => ({
    accessorKey: key,
    header: key,
  }))

  return { columns, data }
})

export const editorAtom = atom<EditorProps>({
  query: '',
  data: [],
})
