'use client'

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Add, DragHandle, Pencil, Eye, EyeOff } from '@/icons'
import { VisibilityState } from '@tanstack/react-table'
import { Reorder } from 'framer-motion'
import * as React from 'react'

export function Columns({
  columns,
  setCols,
  columnVisibility,
  handleColumnVisibility,
}: {
  columns: string[]
  setCols: (cols: string[]) => void
  columnVisibility?: VisibilityState
  handleColumnVisibility: (column: string) => void
}) {
  const [draggable, setDraggable] = React.useState(false)

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="mb-1 flex items-center justify-between">
        <h4 className="text-sm font-medium text-slate-500">
          Columns ({columns.length})
        </h4>
        <button type="button" className="text-sm">
          <Add className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col rounded-lg border py-2">
        {columns.length === 0 ? (
          <p className="p-2 text-center text-sm text-gray-400">
            No columns to display
          </p>
        ) : (
          <Reorder.Group
            axis="y"
            values={columns}
            onReorder={setCols}
            className="space-y-2"
          >
            {columns.map((column) => (
              <Reorder.Item
                key={column}
                value={column}
                dragListener={draggable}
              >
                <div className="flex items-center justify-center px-2">
                  <DragHandle
                    key={column}
                    className="mr-1 h-4 w-4 cursor-grab"
                    onMouseEnter={() => setDraggable(true)}
                    onMouseLeave={() => setDraggable(false)}
                  />
                  <span className="flex-grow text-sm">{column}</span>
                  <div className="flex gap-2">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="cursor-pointer"
                            onClick={() => handleColumnVisibility(column)}
                          >
                            {columnVisibility?.[column] ? (
                              <Eye className="h-4 w-4 text-gray-400" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          {columnVisibility?.[column] ? (
                            <p>Hide</p>
                          ) : (
                            <p>Unhide</p>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Pencil className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  )
}
