import { z } from 'zod'
import { createSupabaseBrowserClient } from '../supabase/client'
import { Tables } from '@/types/database'

export const fetchQueries = async () => {
  const supabase = createSupabaseBrowserClient()
  return supabase.from('query').select()
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
    .from('query')
    .insert({
      name: result.data.name,
    })
    .select()
    .single()
}

export const updateQuery = async (query: {
  id: string
  key: keyof Tables<'query'>
  value: string
}) => {
  const result = z
    .object({
      id: z.string().uuid(),
      value: z.string().trim().min(1),
    })
    .safeParse({ id: query.id, value: query.value })

  if (!result.success) {
    throw new Error('Invalid parameters')
  }

  const obj = {
    [`${query.key}`]: result.data.value,
  }

  const supabase = createSupabaseBrowserClient()
  return supabase.from('query').update(obj).eq('id', query.id)
}

export const deleteQuery = async (id: string) => {
  const result = z.string().uuid().safeParse({ id })

  if (!result.success) {
    throw new Error('Invalid query id')
  }

  const supabase = createSupabaseBrowserClient()
  return supabase.from('query').delete().eq('id', id)
}
