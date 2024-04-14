'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { currentUser } from '@clerk/nextjs/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function createDemoServerClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_DEMO_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_DEMO_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  )
}

export const fetchTables = async () => {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.from('tables').select()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching data')
  }

  return data
}

export const fetchTable = async (tableName: string) => {
  const supabase = await createDemoServerClient()
  const { data, error } = await supabase.from(tableName).select()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching data')
  }

  return data
}

export const insertTable = async (tableName: string) => {
  const user = await currentUser()
  if (!user) {
    throw new Error('User not found')
  }
  const supabase = await createSupabaseServerClient()

  const { error } = await supabase.from('tables').insert({
    user_id: user.id,
    name: tableName,
  })

  if (error) {
    console.error(error.message)
    throw new Error('Error inserting data')
  }

  revalidatePath('/integrations/app-db')
}
