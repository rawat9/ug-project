import { Postgres } from '@/icons'
import { fetchIntegrations } from '@/lib/data'
import Link from 'next/link'

export async function IntegrationsList({ query }: { query: string }) {
  const integrations = await fetchIntegrations()

  if (!integrations.length) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-white py-8">
        <h1>No integrations found</h1>
        <Link
          href="/integrations/create"
          className="text-xs text-gray-500 hover:underline hover:underline-offset-4"
        >
          + Create a new integration
        </Link>
      </div>
    )
  }

  const filteredIntegrations = integrations.filter((integration) =>
    integration.title.toLocaleLowerCase().includes(query),
  )

  return (
    <>
      {filteredIntegrations.length ? (
        <div className="grid gap-4 overflow-y-auto">
          {filteredIntegrations.map((integration, index) => (
            <Link
              href="/integrations/app-db"
              key={index}
              aria-label="Edit integration"
              scroll={false}
            >
              <div
                className="min-h-[100px] w-full cursor-pointer rounded-lg border bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
                data-testid="integration"
              >
                <div className="flex items-center">
                  <div className="flex-1">
                    <h4 className="py-2 font-semibold">{integration.title}</h4>
                    <p className="text-sm text-gray-600">Description</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Postgres className="h-7 w-7" />
                    <p className="font-medium">PostgreSQL</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border bg-white py-8">
          <h1>No results found for &apos;{query}&apos;</h1>
          <p className="text-xs text-gray-500">
            Try a different search term or create a new dashboard
          </p>
        </div>
      )}
    </>
  )
}
