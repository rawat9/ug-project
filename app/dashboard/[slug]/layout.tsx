import { Toolbar } from './_components/toolbar'
import { Sidebar } from './_components/sidebar'
import { getDashboardById, updateDashboardTitle } from '@/lib/data'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const dashboard = await getDashboardById(params.slug)

  return (
    <div className="m-0 min-h-screen overflow-hidden">
      <Toolbar dashboard={dashboard} />
      <Sidebar />
      <>{children}</>
    </div>
  )
}
