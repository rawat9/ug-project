'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tables } from '@/types/database'
import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

export function QueryName({
  id,
  name,
  onRenaming,
}: Pick<Tables<'queries'>, 'id' | 'name'> & {
  onRenaming: (name: string) => void
}) {
  const [isRenaming, setRenaming] = useState(false)
  const [currentName, setCurrentName] = useState(name)
  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentName(event.target.value)
    },
    [],
  )

  const handleRenamingCancel = useCallback(() => {
    setCurrentName(name)
    setRenaming(false)
  }, [name])

  const handleRenamingSave = useCallback(() => {
    onRenaming(currentName)
    setRenaming(false)
  }, [onRenaming, currentName])

  const handleNameKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleRenamingSave()
      } else if (event.key === 'Escape') {
        handleRenamingCancel()
      }
    },
    [handleRenamingCancel, handleRenamingSave],
  )

  return (
    <>
      {isRenaming ? (
        <input
          autoFocus
          autoComplete="off"
          name="name"
          className="p-0 font-medium focus:outline-none"
          onBlur={handleRenamingCancel}
          onKeyDown={handleNameKeyDown}
          onChange={handleNameChange}
          defaultValue={name}
        />
      ) : (
        <>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <h3
                  className="truncate font-medium hover:rounded-sm hover:ring-1"
                  onClick={() => setRenaming(true)}
                >
                  {name}
                </h3>
              </TooltipTrigger>
              <TooltipContent>
                <p>Rename</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </>
  )
}
