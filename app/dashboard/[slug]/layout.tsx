import { Toolbar } from './_components/toolbar'
import { Sidebar } from './_components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="max-h-screen min-h-screen overflow-hidden">
        <Toolbar />
        <Sidebar />
        <>{children}</>
      </div>
    </>
  )
}
