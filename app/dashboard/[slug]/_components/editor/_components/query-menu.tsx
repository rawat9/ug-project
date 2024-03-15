import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from '@/icons'
import { fetchQueries } from '@/lib/data/queries'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import toast from 'react-hot-toast'
import { activeQueryAtom, queriesAtom } from '../state'

export function QueryMenu() {
  const setQueries = useSetAtom(queriesAtom)
  const setActive = useSetAtom(activeQueryAtom)
  const { data: queries, isError } = useQuery({
    queryKey: ['queries'],
    queryFn: () => fetchQueries(),
    select: (it) => it.data,
  })

  if (!queries) {
    return null
  }

  if (isError) {
    return toast.error('Error fetching queries')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 focus:outline-0">
          <Menu className="h-5 w-5 text-slate-500" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Queries</DropdownMenuLabel>
        <DropdownMenuGroup>
          {queries.map((query) => (
            <DropdownMenuItem
              key={query.id}
              onClick={() => {
                if (queries.some((it) => it.id === query.id)) {
                  return setActive(query)
                }

                setQueries((prev) => [...prev, query])
                setActive(query)
              }}
            >
              {query.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
