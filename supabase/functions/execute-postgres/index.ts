import postgres from 'postgres'

const sql = postgres(
  'postgresql://postgres:N6CwvvwtLPJnKRRr@db.cvbsyozqujjjvapqodxj.supabase.co:5432/postgres',
)

Deno.serve(async (req) => {
  const { query } = await req.json()
  const result = await sql.unsafe(query)

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  })
})
