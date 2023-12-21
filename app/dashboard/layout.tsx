import { redirect } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const supabase = createSupabaseBrowserClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/auth/login/')
  }

  return <>{children}</>
}
