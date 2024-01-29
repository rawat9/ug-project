'use server'

import {
  createSupabaseRSCClient,
  createSupabaseServerActionClient,
} from '@/lib/supabase/server'
import { Tables } from '@/types/database'
import { revalidatePath, unstable_cache as cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type Dashboard = Tables<'dashboard'>
type Integration = Tables<'integration'>

function customFetch(input: RequestInfo | URL, init?: RequestInit) {
  return fetch(input as URL, {
    ...init,
    cache: 'force-cache',
  })
}

export const fetchDashboards = async (): Promise<Dashboard[]> => {
  try {
    const supabase = await createSupabaseRSCClient()
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

  const supabase = await createSupabaseRSCClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    console.error('User not logged in')
    redirect('/login')
  }

  const { data, error } = await supabase
    .from('dashboard')
    .insert({
      title,
      user_id: user?.id,
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
    const supabase = await createSupabaseRSCClient()
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

  const supabase = await createSupabaseRSCClient()
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

export const executeQuery = cache(
  async (query: string) => {
    const supabase = await createSupabaseServerActionClient()
    const { data, error } = await supabase.functions.invoke<Result>(
      'execute-query',
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
  },
  ['sql-query'],
)

export const fetchIntegrations = async (): Promise<Integration[]> => {
  try {
    const supabase = await createSupabaseRSCClient()
    const { data, error } = await supabase
      .from('integration')
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

export const executeSqlite = async (query: string) => {
  const supabase = await createSupabaseServerActionClient()
  const { data, error } = await supabase.functions.invoke('turso', {
    method: 'POST',
    body: { query },
  })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error('No data returned')
  }

  return data
}
