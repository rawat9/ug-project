import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Tables } from '@/types/database'

type Dashboard = Tables<'dashboard'>

export const fetchDashboards = async (): Promise<Dashboard[]> => {
  const supabase = createSupabaseBrowserClient()
  const { data, error } = await supabase
    .from('dashboard')
    .select()
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching data')
  }

  return data ?? []
}
