'use server'

import {
  AuthResponse,
  SignInWithPasswordlessCredentials,
} from '@supabase/supabase-js'
import createSupabaseServerClient from './server'

export default async function signInWithOtp(
  credentials: SignInWithPasswordlessCredentials,
): Promise<AuthResponse> {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.signInWithOtp(credentials)
}
