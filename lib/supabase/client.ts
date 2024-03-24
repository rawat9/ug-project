import { Database } from '@/types/database'
import { createBrowserClient } from '@supabase/ssr'

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    Clerk: any
  }
}

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {},
      global: {
        // Get the Supabase token with a custom fetch method
        fetch: async (url, options = {}) => {
          const clerkToken = await window.Clerk?.session?.getToken({
            template: 'supabase',
          })

          const headers = new Headers(options?.headers)
          headers.set('Authorization', `Bearer ${clerkToken}`)

          return fetch(url, {
            ...options,
            headers,
          })
        },
      },
    },
  )
}
