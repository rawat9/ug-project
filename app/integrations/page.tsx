'use client'

import { read, utils } from 'xlsx'
import { Dropzone } from './_components/dropzone'
import { DropzoneOptions } from 'react-dropzone'
import { useCallback, useState } from 'react'
import { DataTable } from './_components/table'
import { ColumnDef } from '@tanstack/react-table'

function transform(header: string[], data: unknown[]) {
  const res = []
  for (const value of data) {
    const obj = {}
    for (const [index, head] of header.entries()) {
      obj[head.toLocaleLowerCase().trim()] = value[index]
    }
    res.push(obj)
  }

  return res
}

export default function Page() {
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [data, setData] = useState<unknown[]>([])

  const options: DropzoneOptions = {
    onDrop: useCallback(async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setFile(file)

      const arrayBuffer = await file.arrayBuffer()
      const workBook = read(arrayBuffer, {
        type: 'buffer',
        cellText: false,
        cellDates: true,
      })

      const workSheet = workBook.Sheets[workBook.SheetNames.at(0)]
      const json = utils.sheet_to_json(workSheet, {
        header: 1,
        raw: false,
        dateNF: 'yyyy-mm-dd',
        rawNumbers: true,
      })

      const header = json[0] as string[]
      setHeaders(Object.values(header))
      setData(
        transform(
          Object.values(header),
          json.slice(1).map((item) => Object.values(item)),
        ),
      )
    }, []),
    maxFiles: 1,
  }

  const columns: ColumnDef<unknown>[] = headers.map((header) => ({
    accessorKey: header.toLocaleLowerCase().trim(),
    header: header.trim(),
  }))

  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <Dropzone options={options} />
      {/* preview */}
      {file && (
        <>
          <div className="mt-4 flex h-20 max-w-4xl flex-col gap-2 rounded-lg border bg-white p-3 shadow-sm">
            <h4 className="font-semibold">{file?.name}</h4>
            <p className="text-sm text-slate-600">{file?.size / 1000000} mb</p>
          </div>
          <DataTable columns={columns} data={data} />
        </>
      )}
    </div>
  )
}
