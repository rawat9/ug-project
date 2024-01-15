'use client'

import { Button } from '@/components/ui/button'
import { Run as RunIcon } from '@/icons'

function Run({ executionHandler }: { executionHandler: () => void }) {
  return (
    <Button variant={'outline'} className="text-sm" onClick={executionHandler}>
      <RunIcon className="mr-2 h-3 w-3" />
      Run
    </Button>
  )
}

export default Run
