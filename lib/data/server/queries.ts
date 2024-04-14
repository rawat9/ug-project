'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { Result } from '@/types'
import { decryptData } from '../aws-kms'

export const executeQuery = async (
  query: string,
  conn_string: { type: 'Buffer'; data: number[] } | null,
  is_default: boolean,
) => {
  const supabase = await createSupabaseServerClient()

  if (is_default || !conn_string) {
    const { data, error } = await supabase.functions.invoke<
      Result['execute-pg']
    >('execute-pg', {
      method: 'POST',
      body: {
        query,
      },
    })

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data returned')
    }

    return data
  }

  const decrypted = await decryptData(Buffer.from(conn_string.data))

  if (!decrypted) {
    throw new Error('Error decrypting connection string')
  }

  const { data, error } = await supabase.functions.invoke<
    Result['execute-query']
  >('execute-query', {
    method: 'POST',
    body: {
      query,
      conn_string: decrypted,
    },
  })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No data returned')
  }

  return data
}

export const executeSqlite = async (query: string) => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.functions.invoke<Result['turso']>(
    'turso',
    {
      method: 'POST',
      body: { query },
    },
  )

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No data returned')
  }

  return data
}
