import { Add, Postgres } from '@/icons'

export function Queries() {
  return (
    <>
      <div className="flex h-14 w-full items-center gap-2 border-b px-4">
        <h1 className="flex-1">Queries</h1>
        <button className="h-5 p-0">
          <Add className="h-4 w-4" />
        </button>
      </div>
      <div className="flex w-full flex-col py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex cursor-pointer items-center gap-4 px-6 py-2 hover:bg-gray-100"
          >
            <Postgres className="h-4 w-4" />
            <p className="text-sm font-medium dark:text-gray-400">
              Query {i + 1}
            </p>
          </li>
        ))}
      </div>
    </>
  )
}
