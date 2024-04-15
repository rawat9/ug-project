import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Add, CaretSort, Check, Postgres } from '@/icons'
import { Tables } from '@/types/database'
import Link from 'next/link'

export function Sources({
  selectedIntegrationId,
  integrations,
  handleSelectChange,
}: {
  selectedIntegrationId?: string | null
  integrations: Tables<'integration'>[]
  handleSelectChange: (integration_id: string) => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 w-[200px] justify-between"
        >
          <span className="truncate">
            {selectedIntegrationId && (
              <Postgres className="mr-2 inline-flex h-4 w-4" />
            )}
            {selectedIntegrationId
              ? integrations.find(
                  (integration) => integration.id === selectedIntegrationId,
                )?.title
              : 'Select integration...'}
          </span>
          <CaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search integration..." className="h-9" />
          <CommandEmpty>No integration found.</CommandEmpty>
          <CommandGroup>
            {integrations.map((integration) => (
              <CommandItem
                key={integration.id}
                value={integration.id}
                onSelect={(value) => {
                  if (value === selectedIntegrationId) return
                  handleSelectChange(integration.id)
                  setOpen(false)
                }}
              >
                {integration.title}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedIntegrationId === integration.id
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
            <CommandItem className="w-full p-0 pt-2">
              <Link href="/integrations" className="w-full">
                <Button size="sm" className="w-full">
                  <Add className="mr-1 h-4 w-4" />
                  Create new integration
                </Button>
              </Link>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
