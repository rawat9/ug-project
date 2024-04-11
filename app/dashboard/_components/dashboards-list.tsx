import { fetchDashboards } from '@/lib/data/server/dashboard'
import Link from 'next/link'
import { EmptyState } from './empty-state'

export async function DashboardsList({ query }: { query: string }) {
  const dashboards = await fetchDashboards()

  if (!dashboards.length) {
    return <EmptyState />
  }

  const filteredDashboards = dashboards.filter((dashboard) =>
    dashboard.title.toLocaleLowerCase().includes(query),
  )

  return (
    <>
      {filteredDashboards.length ? (
        <div className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredDashboards.map((dashboard, index) => (
            <Link
              href={`/dashboard/${dashboard.id}/edit`}
              key={index}
              aria-label="Open dashboard"
              scroll={false}
            >
              <div
                className="min-h-[150px] cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                data-testid="dashboard"
              >
                <h4 className="py-2 font-semibold">{dashboard.title}</h4>
                <p className="text-sm text-slate-500">
                  {dashboard.description}
                </p>
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
    </>
  )
}
