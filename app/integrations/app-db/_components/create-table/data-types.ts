export const dataTypes = [
  { name: 'text', description: 'Variable-length character string' },
  { name: 'integer', description: 'Exact numeric or floating point decimals' },
  { name: 'date', description: 'Calendar date (year, month, day)' },
  { name: 'timestamp', description: 'Data and time (no timezone)' },
  { name: 'uuid', description: 'Universally unique identifier' },
  { name: 'bool', description: 'Logical boolean (true/false)' },
] as const
