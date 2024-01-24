type Column = {
  name: string
  type: string
  default: string
}

type Table = {
  name: string
  columns: Column[]
}

export function createSQLTableQuery(table: Table) {
  const { name, columns } = table
  console.log(name, columns)

  const cols = columns.map((column) => {
    return `${column.name} ${column.type} NOT NULL ${column.default}`
  })
  console.log(cols)

  return `CREATE TABLE IF NOT EXISTS ${name} (`
}

/**
 * CREATE TABLE contacts (
	contact_id INTEGER PRIMARY KEY,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT NOT NULL UNIQUE
);
 */
