'use server'

import { createSupabaseServerClient } from '../../supabase/server'
import { unstable_cache as cache } from 'next/cache'
import type { Result } from '@/types'
import { redirect } from 'next/navigation'
import type { Tables } from '@/types/database'
import { decryptData, encryptData } from '../aws-kms'

type Integration = Tables<'integration'>

export async function createIntegration(
  title: string,
  description: string,
  connectionString: string,
) {
  const supabase = await createSupabaseServerClient()
  const encryptedString = await encryptData(connectionString)

  if (!encryptedString) {
    throw new Error('Error encrypting connection string')
  }
  const { error } = await supabase.from('integration').insert({
    title,
    description,
    conn_string: encryptedString.toJSON(),
  })

  if (error) {
    console.error(error.message)
    throw new Error('Error creating dashboard')
  }

  redirect('/integrations')
}

export const testConnection = cache(
  async (connectionString: string) => {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase.functions.invoke<
      Result['test-connection']
    >('test-connection', {
      method: 'POST',
      body: {
        type: 'postgres',
        conn_string: connectionString,
      },
    })

    if (error) {
      console.log(error)
      throw new Error(error.message)
    }

    if (!data) {
      throw new Error('No data returned')
    }

    if (!data.success) {
      throw new Error('Connection failed')
    }

    return data
  },
  ['connectionString'],
)

export const fetchSchema = async (
  conn_string: { type: 'Buffer'; data: number[] } | null,
  is_default: boolean,
) => {
  const supabase = await createSupabaseServerClient()

  if (is_default || !conn_string) {
    const { data, error } = await supabase.functions.invoke<
      Result['fetch-schema']
    >('fetch-schema', {
      method: 'POST',
      body: {
        conn_string: null,
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
    Result['fetch-schema']
  >('fetch-schema', {
    method: 'POST',
    body: {
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

export const fetchIntegrations = async (): Promise<Integration[]> => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('integration')
      .select()
      .eq('is_default', false)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error('Error fetching data')
    }

    return data ?? []
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}
