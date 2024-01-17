import postgres from 'postgres'
import { Logger } from 'logger'

const sql = postgres(
  'postgresql://postgres:N6CwvvwtLPJnKRRr@db.cvbsyozqujjjvapqodxj.supabase.co:6543/postgres',
  {
    max: 1,
  },
)

const logger = new Logger()

Deno.serve(async (req) => {
  const { query } = await req.json()

  if (!query) {
    return new Response(JSON.stringify({ error: 'Query is required' }), {
      status: 400,
    })
  }

  if (typeof query !== 'string') {
    return new Response(JSON.stringify({ error: 'Query must be a string' }), {
      status: 400,
    })
  }

  let end = 0
  const start = performance.now()
  try {
    const result = await sql.unsafe(query)
    end = performance.now()

    const executionTime = end - start
    logger.info(`Query took ${executionTime}ms`)

    return new Response(
      JSON.stringify({ data: result, error: null, executionTime }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    end = performance.now()
    logger.error(error)
    const executionTime = end - start
    let errorResponse = null
    if (error instanceof postgres.PostgresError) {
      errorResponse = {
        data: [],
        error: {
          name: error.name,
          message: error.message,
          position: error.position,
        },
        executionTime,
      }
    } else {
      errorResponse = {
        data: [],
        error: new Error('Internal Server Error'),
        executionTime,
      }
    }

    return new Response(JSON.stringify(errorResponse), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
