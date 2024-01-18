import Search from '@/components/shared/search'
import { CreateFormDialog } from '../dashboard/_components/create-form-dialog'
import { IntegrationsList } from './_components/integrations-list'
import { Header } from '@/components/shared/header'

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const query = searchParams?.query || ''

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_4rem)] bg-zinc-50">
        <div className="mx-auto flex max-w-screen-lg flex-col px-4 py-24">
          <div className="flex items-center space-x-2">
            <Search />
            <CreateFormDialog />
          </div>
          <IntegrationsList query={query} />
        </div>
      </main>
    </>
  )
}
