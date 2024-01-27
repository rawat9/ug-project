'use client'

import { Dropzone } from './dropzone'
import { DropzoneOptions } from 'react-dropzone'
import { Suspense, useCallback, useState } from 'react'
import { Preview } from './preview'
import { ColumnDef } from '@tanstack/react-table'
import { readCSV, readExcel } from './utils'
import { useSetAtom } from 'jotai'
import { dataImportAtom } from './state'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Cross } from '@/icons'
import { Table } from './types'

export function ExcelImport() {
  const setAtom = useSetAtom(dataImportAtom)
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [data, setData] = useState<unknown[]>([])

  const options: DropzoneOptions = {
    onDrop: useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setFile(file)
      if (file.type === 'text/csv') {
        readCSV(file, (results) => {
          const columns = results.meta.fields ?? []

          if (!columns.length) {
            throw new Error('Headers not found')
          }

          setData(results.data)
          setHeaders(columns)
        })
      } else {
        const { data, columns } = await readExcel(file)
        setHeaders(columns)
        setData(data)
      }
    }, []),
    maxFiles: 1,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
    },
  }

  const columns: ColumnDef<unknown>[] = headers.map((header) => ({
    accessorKey: header.trim(),
    header: header.trim(),
  }))

  const handleSubmit = () => {
    setAtom({
      name: file?.name.split('.')[0] ?? '',
      description: '',
      data,
      columns: columns.map((column) => {
        const columnName = column.header?.toString() ?? ''
        return {
          name: columnName,
          type: 'text',
          default: '',
          options: {
            primary: false,
            nullable: true,
            unique: false,
          },
        } satisfies Table['columns'][number]
      }),
    })
  }

  const handleRemove = useCallback(() => {
    setFile(null)
    setHeaders([])
    setData([])
  }, [])

  return (
    <>
      <div className="h-[90%] px-6 py-4">
        <p className="py-2 text-sm text-slate-600">
          The first row must be the headers of the table*
        </p>
        <Dropzone options={options} />
        {/* preview */}
        {file && (
          <>
            <div className="mt-4 flex h-20 max-w-4xl gap-2 rounded-lg border bg-white p-3 shadow-sm">
              <div className="flex flex-1 flex-col">
                <h4 className="font-semibold">{file?.name}</h4>
                <p className="text-sm text-slate-600">
                  {(file?.size / 1000000).toFixed(2)} mb
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleRemove}>
                <Cross className="h-4 w-4" />
              </Button>
            </div>
            <Suspense
              fallback={<h1 className="text-3xl font-medium">Loading...</h1>}
            >
              {data.length > 0 && (
                <div className="flex flex-col gap-2 py-6">
                  <p className="text-lg font-medium">Preview</p>
                  <p className="text-sm text-slate-600">
                    Your table will have {data.length} rows and the following{' '}
                    {columns.length} columns. Here is a preview of the data that
                    will be added (up to the first 20 columns and first 20
                    rows).
                  </p>
                  <Preview columns={columns} data={data.slice(0, 20)} />
                </div>
              )}
            </Suspense>
          </>
        )}
      </div>
      <SheetFooter className="h-[5%] items-center border-t px-4 py-2">
        <SheetClose asChild>
          <Button type="submit" className="h-8" onClick={handleSubmit}>
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
