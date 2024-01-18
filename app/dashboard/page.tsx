import Link from 'next/link'
import Search from '../../components/shared/search'
import { fetchDashboards } from '@/lib/data'
import { EmptyState } from './_components/empty-state'
import { CreateFormDialog } from './_components/create-form-dialog'
import { Header } from '@/components/shared/header'

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string }
}) {
  const dashboards = await fetchDashboards()
  const query = searchParams?.query || ''
  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.title.toLocaleLowerCase().includes(query),
  )

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh_-_4rem)] bg-zinc-50">
        {!dashboards.length ? (
          <EmptyState />
        ) : (
          <div className="mx-auto flex max-w-screen-lg flex-col px-4 py-24">
            <div className="flex items-center space-x-2">
              <Search />
              <CreateFormDialog />
            </div>
            {filteredDashboards.length ? (
              <div className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
                {filteredDashboards.map((dashboard, index) => (
                  <Link
                    href={`/dashboard/${dashboard.id}`}
                    key={index}
                    aria-label="Open dashboard"
                    scroll={false}
                  >
                    <div
                      className="min-h-[150px] cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                      data-testid="dashboard"
                    >
                      <h4 className="py-2 font-semibold">{dashboard.title}</h4>
                      <p className="text-sm">Description</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="my-4 flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-white py-8">
                <h1>No results found for &apos;{query}&apos;</h1>
                <p className="text-xs text-gray-500">
                  Try a different search term or create a new dashboard
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  )
}
