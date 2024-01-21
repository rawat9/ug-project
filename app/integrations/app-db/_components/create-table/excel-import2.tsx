'use client'

import { type DropzoneOptions } from 'react-dropzone'
import { Dropzone } from './dropzone'
import * as React from 'react'
import { parse } from 'papaparse'
import { Preview } from './preview'
import { ColumnDef } from '@tanstack/react-table'
import { useSetAtom } from 'jotai'
import { createTableAtom } from './state'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function ExcelImport() {
  const set = useSetAtom(createTableAtom)
  const [file, setFile] = React.useState<File | null>(null)
  const [headerRow, setHeaderRow] =
    React.useState<ColumnDef<unknown, unknown>[]>()
  const [data, setData] = React.useState<unknown[]>([])

  const handleChange = React.useCallback(() => {
    if (headerRow) {
      set({
        tableName: file?.name ?? '',
        columns: headerRow.map((column) => {
          const name = column.header?.toString() ?? ''
          return {
            name,
            type: typeof name === 'number' ? 'numeric' : 'text',
            default: '',
          }
        }),
      })
    }
  }, [headerRow, set, file])

  const options: DropzoneOptions = {
    onDrop: React.useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setFile(file)
      parse(file, {
        header: true,
        dynamicTyping: true,
        worker: true,
        complete: (results) => {
          setData(results.data)

          const columns = results.meta.fields

          if (!columns) return

          setHeaderRow(
            columns.map((header) => ({
              accessorKey: header.trim(),
              header: header.trim(),
            })),
          )
        },
      })
    }, []),
    maxFiles: 1,
    accept: {
      'text/csv': ['.csv'],
    },
  }

  return (
    <>
      <div className="h-[90%] px-6 py-4">
        <p>The first row must be the headers of the table</p>
        <Dropzone options={options} />
        {/* preview */}
        {file && (
          <>
            <div className="mt-4 flex h-20 max-w-4xl flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm">
              <h4 className="font-semibold">{file?.name}</h4>
              <p className="text-sm text-slate-600">
                {(file?.size / 1000000).toFixed(2)} mb
              </p>
            </div>
            {data.length > 0 && (
              <div className="flex flex-col gap-2 py-6">
                <p className="text-lg font-medium">Preview</p>
                <p className="text-sm text-slate-600">
                  Your table will have {data.length} rows and the following{' '}
                  {headerRow?.length} columns. Here is a preview of the data
                  that will be added (up to the first 20 columns and first 20
                  rows).
                </p>
                <Preview columns={headerRow ?? []} data={data.slice(0, 20)} />
              </div>
            )}
          </>
        )}
      </div>
      <SheetFooter className="h-[5%] items-center border-t px-4 py-2">
        <SheetClose asChild>
          <Button type="submit" className="h-8" onClick={handleChange}>
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
