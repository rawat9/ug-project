'use client'

import { type DropzoneOptions } from 'react-dropzone'
import { Dropzone } from './dropzone'
import * as React from 'react'
import { parse } from 'papaparse'
import { Preview } from './preview'
import { ColumnDef } from '@tanstack/react-table'

export function ExcelImport() {
  const [file, setFile] = React.useState<File | null>(null)
  const [headerRow, setHeaderRow] = React.useState<ColumnDef<unknown>[]>()
  const [data, setData] = React.useState<unknown[]>([])

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
              size: 50,
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
                {headerRow?.length} columns. Here is a preview of the data that
                will be added (up to the first 20 columns and first 20 rows).
              </p>
              <Preview columns={headerRow ?? []} data={data.slice(0, 20)} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
