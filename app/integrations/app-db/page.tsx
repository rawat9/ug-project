import { DataTable } from './_components/data-table'
import { CreateTable as CreateNewTable } from './_components/create-table'
import { fetchTables } from '@/lib/data/server/demo'
import { Tables } from './_components/tables'
import { Provider } from 'jotai'

export default async function Page() {
  const tables = await fetchTables()

  return (
    <Provider>
      <div className="flex h-12 items-center gap-2 pl-4 pt-2">
        <Tables tables={tables} />
        <CreateNewTable />
      </div>
      <DataTable />
    </Provider>
  )
}
