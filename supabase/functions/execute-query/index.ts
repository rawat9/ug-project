import postgres from 'postgres'
import { Logger } from 'logger'

const logger = new Logger()

const map = new Map([
  [16, 'bool'],
  [20, 'int8'],
  [21, 'int2'],
  [23, 'int4'],
  [700, 'float4'],
  [701, 'float8'],
  [25, 'text'],
  [1043, 'varchar'],
  [1082, 'date'],
  [1114, 'timestamp'],
  [1700, 'numeric'],
])

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

    const columns = result.columns.map((column) => {
      return {
        id: column.number,
        name: column.name,
        dtype: map.get(column.type) ?? 'text',
      }
    })

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
