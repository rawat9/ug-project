'use server'

import { SignInWithPasswordlessCredentials } from '@supabase/supabase-js'
import createSupabaseServerClient from '@/lib/supabase/server'

export async function signIn(credentials: SignInWithPasswordlessCredentials) {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.signInWithOtp(credentials)
}
