import { Button } from '@/components/ui/button'
import { Run as RunIcon, Spinner } from '@/icons'
import * as React from 'react'

export function Run({
  executionHandler,
}: {
  executionHandler: () => Promise<void>
}) {
  const [loading, setLoading] = React.useState(false)

  return (
    <Button
      variant="outline"
      className="h-8 px-3 text-sm"
      onClick={async () => {
        setLoading(true)
        await executionHandler()
        setLoading(false)
      }}
      disabled={loading}
    >
      {loading ? (
        <Spinner className="mr-2 h-3 w-3 animate-spin duration-500" />
      ) : (
        <RunIcon className="mr-2 h-3 w-3" />
      )}
      Run
    </Button>
  )
}
