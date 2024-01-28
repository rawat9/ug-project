import { Table } from './types'

export function createSQLTableQuery(table: Table) {
  const { name, columns } = table

  try {
    const cols = columns.map((column) => {
      if (!column.default) {
        return `\`${column.name}\` ${column.type.toUpperCase()} ${parseColumnOptions(column.options)}`.trim()
      }

      return `\`${column.name}\` ${column.type.toUpperCase()} ${parseColumnOptions(column.options)} DEFAULT ${column.default}`.trim()
    })

    return `CREATE TABLE ${name} ( ${cols.join(', ')} )`
  } catch (error) {
    console.error(error)
  }
}

function parseColumnOptions(
  options: Pick<Table['columns'][0], 'options'>['options'],
): string {
  const { primary, nullable, unique } = options
  const opts = []

  if (primary) {
    opts.push('PRIMARY KEY')
  }

  if (!nullable) {
    opts.push('NOT NULL')
  }

  if (unique) {
    opts.push('UNIQUE')
  }

  return opts.join(' ')
}

export function insertSQLTableQuery(table: Table, data: unknown[]) {
  const { name, columns } = table

  try {
    const cols = columns.map((column) => {
      return `\`${column.name}\``.trim()
    })

    return `INSERT INTO ${name} ( ${cols.join(', ')} ) VALUES
      ${data.map((row) => {
        const r = Object.values(row)
          .map((v) => `\"${v}\"`)
          .join(', ')

        return `(${r})`
      })}`
  } catch (error) {
    console.error(error)
  }
}
