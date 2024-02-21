import postgres from 'postgres'
import { Logger } from 'logger'

const logger = new Logger()

Deno.serve(async (req) => {
  const { conn_string, query } = await req.json()

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

  const sql = postgres(conn_string)

  let end = 0
  const start = performance.now()
  try {
    const result = await sql.unsafe(query)
    end = performance.now()

    const columns = result.columns.map((column) => column.name)

    const executionTime = end - start
    logger.info(`Query took ${executionTime}ms`)

    return new Response(
      JSON.stringify({ data: result, columns, error: null, executionTime }),
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
        columns: [],
        error: {
          name: error.name,
          message: error.message,
          position: error.position,
          hint: error.hint,
        },
        executionTime,
      }
    } else {
      errorResponse = {
        data: [],
        columns: [],
        error: new Error('Internal Server Error'),
        executionTime,
      }
    }

    return new Response(JSON.stringify(errorResponse), {
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
