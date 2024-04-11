'use client'

import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { updateDashboardTitle } from '@/lib/data/server/dashboard'
import { Tables } from '@/types/database'
import { usePathname } from 'next/navigation'
import lodashLast from 'lodash/last'

export function ToolbarTitle({
  id,
  title,
}: Pick<Tables<'dashboard'>, 'id' | 'title'>) {
  const [isRenaming, setRenaming] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(title)
  const pathname = usePathname()
  const isPreviewMode = lodashLast(pathname.split('/')) === 'preview'

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
          className="p-0 font-medium focus:outline-none"
          onBlur={handleRenamingCancel}
          onKeyDown={handleNameKeyDown}
          onChange={handleNameChange}
          defaultValue={title}
        />
      ) : (
        <>
          {isPreviewMode ? (
            <h3 className="select-all truncate font-medium">{title}</h3>
          ) : (
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
          )}
        </>
      )}
    </>
  )
}
