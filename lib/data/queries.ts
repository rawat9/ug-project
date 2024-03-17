import { z } from 'zod'
import { createSupabaseBrowserClient } from '../supabase/client'

export const fetchQueries = async () => {
  const supabase = createSupabaseBrowserClient()
  return supabase.from('queries').select()
}

export const createQuery = async (query: { name: string }) => {
  const result = z
    .object({
      name: z.string().trim().min(1),
    })
    .safeParse({ query: query.name })

  if (!result.success) {
    throw new Error('Invalid query type')
  }

  const supabase = createSupabaseBrowserClient()
  return supabase
    .from('queries')
    .insert({
      name: result.data.name,
    })
    .select()
    .single()
}

export const updateQuery = async (query: { id: string; name: string }) => {
  const result = z
    .object({
      id: z.string().uuid(),
      name: z.string().trim().min(1),
    })
    .safeParse({ id: query.id, name: query.name })

  if (!result.success) {
    throw new Error('Invalid parameters')
  }

  const supabase = createSupabaseBrowserClient()
  return supabase
    .from('queries')
    .update({
      name: query.name,
    })
    .eq('id', query.id)
}

export const deleteQuery = async (id: string) => {
  const result = z.string().uuid().safeParse({ id })

  if (!result.success) {
    throw new Error('Invalid query id')
  }

  const supabase = createSupabaseBrowserClient()
  return supabase.from('queries').delete().eq('id', id)
}
