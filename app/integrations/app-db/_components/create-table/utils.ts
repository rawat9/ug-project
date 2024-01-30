import { ParseResult, parse } from 'papaparse'
import { read, utils } from 'xlsx'

export function readCSV(
  file: File,
  completeCallback: (results: ParseResult<Record<string, unknown>>) => void,
) {
  parse(file, {
    header: true,
    dynamicTyping: true,
    worker: true,
    complete: completeCallback,
  })
}

export async function readExcel(file: File) {
  const arrayBuffer = await file.arrayBuffer()
  const workBook = read(arrayBuffer, {
    type: 'file',
    cellText: false,
    cellDates: true,
  })

  // @ts-ignore
  const workSheet = workBook.Sheets[workBook.SheetNames.at(0)]
  const json = utils.sheet_to_json<Record<string, unknown>>(workSheet, {
    raw: false,
    rawNumbers: true,
  })
  return {
    data: json,
    columns: Object.keys(json[0] as Record<string, unknown>),
  }
}
