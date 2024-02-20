import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authCode = searchParams.get('code')
  const redirectTo = request.nextUrl.clone()

  if (authCode) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      },
    )
    const { error } = await supabase.auth.exchangeCodeForSession(authCode)
    if (!error) {
      return NextResponse.redirect(`${redirectTo.origin}/dashboard`)
    }
  }

  // return the user to the login page if the token is invalid
  redirectTo.pathname = '/auth/login'
  return NextResponse.redirect(
    `${redirectTo.origin}/auth/login/?error=Invalid token`,
  )
}
