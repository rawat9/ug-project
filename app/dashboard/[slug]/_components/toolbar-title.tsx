'use client'

import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Pencil } from '@/icons'
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
          className="bg-transparent text-center font-medium outline-none"
          onBlur={handleRenamingCancel}
          onKeyDown={handleNameKeyDown}
          onChange={handleNameChange}
          defaultValue={title}
        />
      ) : (
        <>
          <h3 className="truncate font-medium">{title}</h3>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button>
                  <Pencil
                    className="h-4 w-4 text-slate-400"
                    onClick={() => setRenaming(true)}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      )}
    </>
  )
}
