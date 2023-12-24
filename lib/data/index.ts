'use server'

import { createSupabaseRSCClient } from '@/lib/supabase/server'
import { Tables } from '@/types/database'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

type Dashboard = Tables<'dashboard'>

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
  const supabase = await createSupabaseRSCClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('dashboard')
    .insert({
      title: body.get('title') as string,
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

export const getDashboardById = async (id: string): Promise<Dashboard> => {
  try {
    const supabase = await createSupabaseRSCClient()
    const { data, error } = await supabase
      .from('dashboard')
      .select()
      .eq('id', id)
      .single()

    if (error) {
      console.error(error.message)
      throw new Error('Error fetching data')
    }

    if (!data) {
      throw new Error('Dashboard not found')
    }

    return data
  } catch (error) {
    console.error(error)
    throw new Error('Error creating the supabase client')
  }
}

export const updateDashboardTitle = async (dashboard: Dashboard) => {
  const supabase = await createSupabaseRSCClient()
  const { error } = await supabase
    .from('dashboard')
    .update({
      title: dashboard.title.trim(),
    })
    .eq('id', dashboard.id)

  if (error) {
    console.error(error.message)
    throw new Error('Error updating dashboard')
  }

  revalidatePath('/dashboard')
}
