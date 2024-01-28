import { createClient } from '@libsql/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const client = createClient({
      url: process.env.TURSO_DB_URL!,
      authToken: process.env.TURSO_DB_AUTH_TOKEN!,
    })

    const { query } = await request.json()

    const result = await client.execute(query)
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error })
  }
}
