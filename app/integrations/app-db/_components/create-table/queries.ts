import { Table } from './types'

export function createSQLTableQuery(table: Table) {
  const { name, columns } = table

  try {
    const cols = columns.map((column) => {
      if (!column.default) {
        return `${column.name} ${column.type} ${parseColumnOptions(column.options)}`.trim()
      }

      return `${column.name} ${column.type} ${parseColumnOptions(column.options)} default ${column.default}`.trim()
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
    opts.push('primary key')
  }

  if (!nullable) {
    opts.push('not null')
  }

  if (unique) {
    opts.push('unique')
  }

  return opts.join(' ')
}

export function insertSQLTableQuery(
  table: Table,
  data: Record<string, unknown>[],
) {
  const { name, columns } = table

  try {
    const cols = columns.map((column) => {
      return column.name.trim()
    })

    return `INSERT INTO ${name} ( ${cols.join(', ')} ) VALUES
      ${data.map(
        (row) =>
          `(${Object.values(row)
            .map((v) => {
              return typeof v === 'string' ? `\'${v}\'` : v
            })
            .join(',')})`,
      )}`
  } catch (error) {
    console.error(error)
  }
}
