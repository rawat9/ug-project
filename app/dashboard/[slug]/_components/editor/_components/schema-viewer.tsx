import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { TableSchema } from '@/types'
import lodashGroupBy from 'lodash/groupBy'
import * as React from 'react'

export function SchemaViewer({ schema }: { schema: TableSchema[] }) {
  const groupedSchema = React.useMemo(
    () => lodashGroupBy(schema, 'table_name'),
    [schema],
  )

  return (
    <div className="h-full overflow-y-scroll pb-20">
      <div className="flex h-full flex-col space-y-2 px-4">
        {!schema.length ? (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-500">No columns available</span>
          </div>
        ) : (
          Object.entries(groupedSchema).map(([tableName, columns]) => (
            <Accordion key={tableName} type="multiple">
              <AccordionItem value={tableName}>
                <AccordionTrigger>{tableName}</AccordionTrigger>
                <AccordionContent>
                  {columns.map((column) => (
                    <div
                      key={column.column_name}
                      className="flex justify-between"
                    >
                      <span>{column.column_name}</span>
                      <span className="text-gray-500">{column.udt_name}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))
        )}
      </div>
    </div>
  )
}
