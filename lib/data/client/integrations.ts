import { createSupabaseBrowserClient } from '../../supabase/client'

export const fetchIntegrations = async () => {
  const supabase = createSupabaseBrowserClient()
  return supabase.from('integration').select()
}
