'use server'

import { SignInWithPasswordlessCredentials } from '@supabase/supabase-js'
import createSupabaseServerClient from '@/lib/supabase/server'

export async function auth() {
  const supabase = await createSupabaseServerClient()

  return {
    signIn: async (credentials: SignInWithPasswordlessCredentials) =>
      await supabase.auth.signInWithOtp(credentials),
    signOut: async () => await supabase.auth.signOut(),
    getSession: async () => await supabase.auth.getSession(),
    getCurrentUser: async () => await supabase.auth.getUser(),
  }
}
