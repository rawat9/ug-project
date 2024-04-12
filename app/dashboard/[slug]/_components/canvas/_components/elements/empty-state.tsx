import { Data } from '@/icons'

export function EmptyDataState() {
  return (
    <div className="flex h-full items-center justify-center rounded-md border border-dashed bg-tremor-background-muted p-4 dark:border-dark-tremor-border dark:bg-dark-tremor-background-subtle">
      <div className="text-center">
        <Data className="mx-auto h-6 w-6 text-gray-400" aria-hidden={true} />
        <p className="mt-2 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          No data to show
        </p>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Make sure that the data source is provided
        </p>
      </div>
    </div>
  )
}
