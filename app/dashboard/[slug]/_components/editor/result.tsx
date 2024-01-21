'use client'

import { useAtom, useAtomValue } from 'jotai'
import { queryResultAtom, showQueryResultAtom } from './state'
import { ResultsTable } from './results-table'
import { ResizablePanel } from '@/components/ui/resizable'
import { ImperativePanelHandle } from 'react-resizable-panels'
import * as React from 'react'

export function Result() {
  const queryResult = useAtomValue(queryResultAtom)
  const showQueryResults = useAtomValue(showQueryResultAtom)
  console.log('Result', queryResult, showQueryResults)

  if (!queryResult)
    return <ResizablePanel id="empty-result" defaultSize={0} order={2} />

  const { data, executionTime, columns } = queryResult

  return (
    <>
      {showQueryResults && (
        <ResizablePanel id="result" order={2} defaultSize={50} minSize={30}>
          <div className="flex h-8 w-full items-center gap-2 px-4">
            <h1 className="text-sm font-semibold text-slate-600">Result</h1>
            <p className="ml-auto text-sm text-slate-600">
              Ran successfully in {executionTime} ms
            </p>
          </div>
          {/* {error ? (
            <div className="flex h-full w-full items-center justify-center">
              <h1 className="text-sm font-semibold text-slate-600">
                {error.message}
              </h1>
            </div>
          ) : ( */}
          <ResultsTable columns={columns ?? []} data={data} />
          {/* )} */}
        </ResizablePanel>
      )}
    </>
  )
}
