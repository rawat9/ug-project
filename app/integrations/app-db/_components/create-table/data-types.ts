export const dataTypes = [
  { name: 'int4', description: 'Signed 4 byte integer' },
  { name: 'int8', description: 'Signed 8 byte integer' },
  { name: 'text', description: 'Variable-length character string' },
  { name: 'numeric', description: 'Exact numeric of selectable precision' },
  { name: 'varchar', description: 'Variable-length character string' },
  { name: 'date', description: 'Calendar date (year, month, day)' },
  { name: 'uuid', description: 'Universally unique identifier' },
  { name: 'bool', description: 'Logical boolean (true/false)' },
] as const
