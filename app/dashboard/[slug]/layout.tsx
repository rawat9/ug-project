import { Toolbar } from './_components/toolbar'
import { Provider as JotaiProvider } from 'jotai'
import { Suspense } from 'react'
import { Loading } from './_components/skeleton-loader'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return (
    <div className="m-0 min-h-screen overflow-hidden">
      <JotaiProvider>
        <Suspense fallback={<Loading />}>
          <Toolbar id={params.slug} />
          {children}
        </Suspense>
      </JotaiProvider>
    </div>
  )
}
