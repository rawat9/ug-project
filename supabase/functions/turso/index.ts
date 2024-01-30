import { createClient } from '@libsql/client/web'

const client = createClient({
  url: Deno.env.get('TURSO_DB_URL')!,
  authToken: Deno.env.get('TURSO_DB_AUTH_TOKEN')!,
})

Deno.serve(async (req) => {
  try {
    const { query } = await req.json()

    if (!query) {
      return new Response('No query provided', { status: 400 })
    }

    if (typeof query !== 'string') {
      return new Response('Query must be a string', { status: 400 })
    }

    const result = await client.execute(query)

    return new Response(JSON.stringify(result.toJSON()), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new Response('An error occurred', { status: 500 })
  }
})
