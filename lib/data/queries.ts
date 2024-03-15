// TODO: zod validation; error handling
import { createSupabaseBrowserClient } from '../supabase/client'

export const fetchQueries = async () => {
  const supabase = createSupabaseBrowserClient()
  return supabase.from('queries').select()
}

export const createQuery = async (query: { name: string }) => {
  const supabase = createSupabaseBrowserClient()
  return supabase
    .from('queries')
    .insert({
      name: query.name,
    })
    .select()
    .single()
}

export const updateQuery = async (query: { id: string; name: string }) => {
  const supabase = createSupabaseBrowserClient()
  return supabase
    .from('queries')
    .update({
      name: query.name,
    })
    .eq('id', query.id)
}

export const deleteQuery = async (id: string) => {
  const supabase = createSupabaseBrowserClient()
  return supabase.from('queries').delete().eq('id', id)
}
