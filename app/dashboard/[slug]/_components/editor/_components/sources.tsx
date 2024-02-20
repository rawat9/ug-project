'use client'

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
import { Add, CaretSort, Check } from '@/icons'

const frameworks = [
  {
    value: 'postgresql',
    label: 'onboarding-db (PostgreSQL)',
  },
  {
    value: 'mysql',
    label: 'sales-db (MySQL)',
  },
]

export function Sources() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-8 w-[190px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'Select integration...'}
          <CaretSort className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search integration..." className="h-9" />
          <CommandEmpty>No integration found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}
              >
                {framework.label}
                <Check
                  className={cn(
                    'ml-auto h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </CommandItem>
            ))}
            <CommandItem className="w-full p-0 pt-2">
              <Button size="sm" className="w-full">
                <Add className="mr-1 h-4 w-4" />
                Create new integration
              </Button>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
