import postgres from 'postgres'
import { Logger } from 'logger'

const sql = postgres(
  'postgresql://postgres:N6CwvvwtLPJnKRRr@db.cvbsyozqujjjvapqodxj.supabase.co:5432/postgres',
)

const logger = new Logger()

Deno.serve(async (req) => {
  const { query } = await req.json()

  let end = 0
  const start = performance.now()
  const { data, error } = await sql
    .unsafe(query)
    .then((res) => {
      end = performance.now()
      return { data: res, error: null }
    })
    .catch((error) => {
      end = performance.now()
      logger.error(error)
      if (error instanceof postgres.PostgresError) {
        return {
          data: [],
          error: {
            name: error.name,
            message: error.message,
            position: error.position,
          },
        }
      }
      return {
        data: [],
        error: new Error('Internal server error'),
      }
    })
    .finally(async () => {
      // Close the database connection
      await sql.end()
    })
  const executionTime = end - start
  logger.info(`Query took ${executionTime}ms`)

  return new Response(JSON.stringify({ data, error, executionTime }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
