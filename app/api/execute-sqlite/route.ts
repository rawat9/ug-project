import { createClient } from '@libsql/client'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const client = createClient({
      url: 'libsql://app-db-rawat9.turso.io',
      authToken:
        'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTI3VDIyOjE5OjE2LjQwNzQ5NjEzN1oiLCJpZCI6IjA0N2Q2ODdkLWI3ZDUtMTFlZS1iMTg5LWE2MDMzNTNjNjBiMyJ9.wJcB72-nY0X0TYmm_NiGlgH8HGavfeFDWQ7SWCSPHC79gaiD548DB6P2nrV2GuA7loou2ecMnOBPUZTYRqcXAQ',
    })

    const { query } = await request.json()
    console.log(query)

    const result = await client.executeMultiple(query)
    return NextResponse.json({ data: result }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error })
  }
}
