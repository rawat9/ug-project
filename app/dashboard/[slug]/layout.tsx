import { Toolbar } from './_components/toolbar'
import { Sidebar } from './_components/sidebar'
import { getDashboardById } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const dashboard = await getDashboardById(params.slug)

  if (!dashboard) {
    notFound()
  }

  return (
    <div className="m-0 min-h-screen overflow-hidden">
      <Toolbar>
        <Toolbar.Title id={dashboard.id} title={dashboard.title} />
      </Toolbar>
      <Sidebar />
      <>{children}</>
    </div>
  )
}
