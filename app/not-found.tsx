import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen place-items-center bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-max">
        <main className="sm:flex">
          <p className="bg-gradient-to-br from-slate-500 to-zinc-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            404
          </p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 sm:pl-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Page not found
              </h1>
              <p className="mt-1 text-base text-gray-500">
                Please check the URL in the address bar and try again.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/"
                className="inline-flex items-center rounded-md border-transparent bg-gradient-to-br from-slate-600 to-zinc-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gradient-to-br hover:from-slate-800 hover:to-zinc-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
