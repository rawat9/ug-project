import Search from '@/components/shared/search'
import { Header } from '@/components/shared/header'
import { CreateFormDialog } from './_components/create-form-dialog'
import { DashboardsList } from './_components/dashboards-list'
import { DashboardsListSkeleton } from './_components/dashboards-list-skeleton'
import { Suspense } from 'react'

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
          <Suspense fallback={<DashboardsListSkeleton />}>
            <DashboardsList query={query} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
