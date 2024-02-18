import { Toolbar } from './_components/toolbar'
import { Sidebar } from './_components/sidebar'
import { Provider as JotaiProvider } from 'jotai'

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
        <Toolbar id={params.slug} />
        <Sidebar />
        <>{children}</>
      </JotaiProvider>
    </div>
  )
}
