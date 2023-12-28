'use server'

import { SignInWithPasswordlessCredentials } from '@supabase/supabase-js'
import {
  createSupabaseRSCClient,
  createSupabaseServerActionClient,
} from '@/lib/supabase/server'

export async function signIn(credentials: SignInWithPasswordlessCredentials) {
  const supabase = await createSupabaseServerActionClient()
  return supabase.auth.signInWithOtp(credentials)
}

export async function signOut() {
  const supabase = await createSupabaseServerActionClient()
  return supabase.auth.signOut()
}

export async function getSession() {
  const supabase = await createSupabaseRSCClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching session')
  }

  return data
}

export async function getUser() {
  const supabase = await createSupabaseRSCClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching the user')
  }

  return data
}
