import { AggregationFn } from '@tanstack/react-table'

export interface PostgresError {
  name: string
  message: string
  position: string
  hint?: string
}

export type Column = {
  id: number
  name: string
  dtype: string
  aggregationFn?: AggregationFn<any>
}

export interface Result {
  'execute-pg': {
    data: unknown[]
    columns: Column[]
    error: PostgresError | null
    executionTime: number
  }
  'execute-query': {
    data: unknown[]
    columns: Column[]
    error: PostgresError | null
    executionTime: number
  }
  turso: {
    /** Names of columns.
     *
     * Names of columns can be defined using the `AS` keyword in SQL:
     *
     * ```sql
     * SELECT author AS author, COUNT(*) AS count FROM books GROUP BY author
     * ```
     */
    columns: string[]

    /** Types of columns.
     *
     * The types are currently shown for types declared in a SQL table. For
     * column types of function calls, for example, an empty string is
     * returned.
     */
    columnTypes: string[]

    /** Rows produced by the statement. */
    rows: {
      length: number

      /** Columns can be accessed like an array by numeric indexes. */
      [index: number]: bigint | number | string | null

      /** Columns can be accessed like an object by column names. */
      [name: string]: bigint | number | string | null
    }[]

    /** Number of rows that were affected by an UPDATE, INSERT or DELETE operation.
     *
     * This value is not specified for other SQL statements.
     */
    rowsAffected: number

    /** ROWID of the last inserted row.
     *
     * This value is not specified if the SQL statement was not an INSERT or if the table was not a ROWID
     * table.
     */
    lastInsertRowid: bigint | undefined

    /** Converts the result set to JSON.
     *
     * This is used automatically by `JSON.stringify()`, but you can also call it explicitly.
     */
    toJSON(): any
  }
}
