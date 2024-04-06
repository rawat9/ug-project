import Search from '@/components/shared/search'
import { IntegrationsList } from './_components/integrations-list'
import { Header } from '@/components/shared/header'
import { Suspense } from 'react'
import Link from 'next/link'
import { Add, Sqlite } from '@/icons'
import { Button } from '@/components/ui/button'
import { IntegrationsListSkeleton } from './_components/integrations-list-skeleton'

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
          <div className="flex items-center space-x-2 pb-10">
            <Search />
            <Link href={'/integrations/create'}>
              <Button>
                <Add />
                <p className="ml-2 hidden sm:flex">Add New</p>
              </Button>
            </Link>
          </div>
          <Link
            href="/integrations/app-db"
            aria-label="Edit integration"
            scroll={false}
          >
            <div
              className="min-h-[100px] w-full cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
              data-testid="app-db-integration"
            >
              <div className="flex items-center">
                <div className="flex-1">
                  <h4 className="py-2 font-semibold">Demo DB</h4>
                  <p className="text-sm text-gray-600">
                    Managed by Dashgen. You can create new tables and import
                    data using CSV or Excel
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Sqlite className="h-7 w-7" />
                  <p className="font-medium">SQLite</p>
                </div>
              </div>
            </div>
          </Link>
          <div className="my-8 h-px w-full bg-zinc-200" />
          <Suspense fallback={<IntegrationsListSkeleton />}>
            <IntegrationsList query={query} />
          </Suspense>
        </div>
      </main>
    </>
  )
}
