import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const redirectTo = req.nextUrl.clone()
  const code = searchParams.get('code')

  const supabase = await createSupabaseServerClient()

  if (!code) {
    console.error('No code provided')
    return NextResponse.json({ error: 'No code provided' }, { status: 400 })
  }

  // exchange the auth code for user session
  const { error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) {
    console.error('Error exchanging code for session', error)
    return NextResponse.json(
      { error: 'Error exchanging code for session' },
      { status: 500 },
    )
  }

  // redirect the user to /dashboard
  return NextResponse.redirect(`${redirectTo.origin}/dashboard`)
}
