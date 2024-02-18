'use client'

import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { updateDashboardTitle } from '@/lib/data'
import { Tables } from '@/types/database'

export function ToolbarTitle({
  id,
  title,
}: Pick<Tables<'dashboard'>, 'id' | 'title'>) {
  const [isRenaming, setRenaming] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(title)

  const handleNameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentTitle(event.target.value)
    },
    [],
  )

  const handleRenamingCancel = useCallback(() => {
    setCurrentTitle(title)
    setRenaming(false)
  }, [title])

  const handleRenamingSave = useCallback(async () => {
    await updateDashboardTitle({ id, title: currentTitle })
    setRenaming(false)
  }, [id, currentTitle])

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
          name="title"
          className="border-0 p-0 font-medium focus:border-transparent focus:ring-0"
          onBlur={handleRenamingCancel}
          onKeyDown={handleNameKeyDown}
          onChange={handleNameChange}
          defaultValue={title}
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
                  {title}
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
