import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from './_components/data-table'
import { CreateTable as CreateNewTable } from './_components/create-table'

export default function Page() {
  return (
    <>
      <div className="flex h-12 items-center gap-2 pl-4 pt-2">
        <Tabs defaultValue="sales">
          <TabsList className="rounded-b-none bg-slate-100 py-2">
            <TabsTrigger value="users">users</TabsTrigger>
            <TabsTrigger value="sales">sales</TabsTrigger>
          </TabsList>
        </Tabs>
        <CreateNewTable />
      </div>
      <DataTable />
    </>
  )
}
