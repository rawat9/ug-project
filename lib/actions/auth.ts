// REMOVE THIS FILE
'use server'

import type { SignInWithPasswordlessCredentials } from '@supabase/supabase-js'
import { createSupabaseServerClient } from '../supabase/server'

export async function signIn(credentials: SignInWithPasswordlessCredentials) {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.signInWithOtp(credentials)
}

export async function signOut() {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error.message)
  }
}

export async function getSession() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching session')
  }

  return data
}

export async function getUser() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.getUser()

  if (error) {
    console.error(error.message)
    throw new Error('Error fetching the user')
  }

  return data
}
