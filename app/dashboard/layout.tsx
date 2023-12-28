import { redirect } from 'next/navigation'
import { getSession } from '@/lib/actions'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const { session } = await getSession()

  if (!session) {
    redirect('/auth/login/')
  }

  return <>{children}</>
}
