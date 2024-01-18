import Link from 'next/link'

export function IntegrationsList({ query }: { query: string }) {
  const filteredDashboards = [
    {
      id: 1,
      title: 'Test Integration 1',
    },
    {
      id: 2,
      title: 'Test Integration 2',
    },
    {
      id: 3,
      title: 'Test Integration 3',
    },
    {
      id: 4,
      title: 'Test Integration 4',
    },
  ]

  return (
    <>
      {filteredDashboards.length ? (
        <div className="grid gap-4 overflow-auto py-10">
          {filteredDashboards.map((dashboard, index) => (
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
                    <h4 className="py-2 font-semibold">{dashboard.title}</h4>
                    <p className="text-sm text-gray-600">Description</p>
                  </div>
                  <p>PostgreSQL</p>
                </div>
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
