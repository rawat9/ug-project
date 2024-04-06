'use server'

import { Element } from '@/app/dashboard/[slug]/_components/canvas/types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_cache as cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import type { Result } from '@/types'
import type { Json, Tables } from '@/types/database'
import {
  CommitmentPolicy,
  KmsKeyringNode,
  buildClient,
} from '@aws-crypto/client-node'

type Dashboard = Tables<'dashboard'>
type Integration = Tables<'integration'>

export const fetchDashboards = async (): Promise<Dashboard[]> => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('dashboard')
      .select()
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error.message)
      throw new Error('Error fetching data')
    }

    return data ?? []
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}

export const createDashboard = async (body: FormData) => {
  const result = z
    .object({
      title: z.string().trim().min(1),
    })
    .safeParse({ title: body.get('title') })

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid form data')
  }

  const { title } = result.data

  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('dashboard')
    .insert({
      title,
    })
    .select('id')
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Error creating dashboard')
  }

  revalidatePath('/dashboard')
  redirect(`/dashboard/${data?.id}`)
}

export const getDashboardById = async (
  id: string,
): Promise<Dashboard | null> => {
  const result = z.string().uuid().safeParse(id)

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid uuid')
  }

  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('dashboard')
      .select()
      .eq('id', result.data)
      .single()

    if (error) {
      console.error(error.message)
      return null
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}

export const updateDashboardTitle = async ({
  id,
  title,
}: {
  id: string
  title: string
}) => {
  const result = z
    .object({
      id: z.string().uuid(),
      title: z.string().trim().min(1),
    })
    .safeParse({ id, title })

  if (!result.success) {
    console.error(result.error)
    throw new Error('Invalid form data')
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase
    .from('dashboard')
    .update({
      title: result.data.title,
    })
    .eq('id', result.data.id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }

  revalidatePath('/dashboard')
}

async function decryptData(encryptedData: Buffer) {
  const generatorKeyId = process.env.AWS_KMS_KEY_ID

  const { decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT,
  )

  const keyring = new KmsKeyringNode({ generatorKeyId })

  const context = {
    stage: 'dashgen',
    purpose: 'Data dashboard tool',
    origin: process.env.AWS_REGION!,
  }

  try {
    const { plaintext, messageHeader } = await decrypt(keyring, encryptedData)
    const { encryptionContext } = messageHeader

    Object.entries(context).forEach(([key, value]) => {
      if (encryptionContext[key] !== value)
        throw new Error('Encryption Context does not match expected values')
    })

    return plaintext.toString()
  } catch (e) {
    console.error(e)
  }
}

export const executeQuery = async (
  query: string,
  conn_string: { type: 'Buffer'; data: number[] },
) => {
  const supabase = await createSupabaseServerClient()
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

export const fetchIntegrations = async (): Promise<Integration[]> => {
  try {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
      .from('integration')
      .select()
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

export const saveCanvas = async (id: string, elements: Element[]) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      content: { elements } as unknown as Json,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }
}

type Canvas = {
  elements: Element[]
}

export const fetchCanvas = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('dashboard')
    .select('content')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching data')
  }

  // FIX ME - This is a hack to get around the type system
  return data.content as unknown as Canvas
}

export const publishDashboard = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      is_published: true,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error publishing dashboard')
  }
}

export const unPublishDashboard = async (id: string) => {
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase
    .from('dashboard')
    .update({
      is_published: false,
    })
    .eq('id', id)

  if (error) {
    console.error(error.message)
    throw new Error('Error un-publishing dashboard')
  }
}

export const fetchSchema = cache(
  async (conn_string: { type: 'Buffer'; data: number[] }) => {
    const supabase = await createSupabaseServerClient()
    // const decrypted = await decryptData(Buffer.from(conn_string.data))

    // if (!decrypted) {
    //   throw new Error('Error decrypting connection string')
    // }

    const { data, error } = await supabase.functions.invoke<
      Result['fetch-schema']
    >('fetch-schema', {
      method: 'POST',
      // body: {
      //   // conn_string: decrypted,
      // },
    })

    if (error) {
      throw error
    }

    if (!data) {
      throw new Error('No data returned')
    }

    return data
  },
  ['schema'],
)
