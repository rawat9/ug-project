interface PostgresError {
  name: string
  message: string
  position: string
  hint?: string
}

interface Result {
  data: unknown[]
  columns: string[]
  error: PostgresError | null
  executionTime: number
}
