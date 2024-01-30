import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { Control, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Options } from '@/icons'
import * as React from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { Table } from './types'

export function InputSelect({
  name,
  control,
  children,
}: {
  name: `columns.${number}.default`
  control: Control<Table>
  children: React.ReactElement | null
}) {
  return (
    <Controller
      name={name}
      defaultValue=""
      control={control}
      render={({ field: { value, onChange } }) => {
        if (!children) {
          return <Input autoComplete="off" placeholder="NULL" />
        }
        return (
          <Select onValueChange={onChange}>
            <div className="relative">
              <Input
                type="text"
                autoComplete="off"
                placeholder="NULL"
                value={value}
                onChange={onChange}
              />
              <SelectPrimitive.SelectTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-1 top-1/2 h-7 -translate-y-1/2 transform bg-slate-100"
                >
                  <Options className="h-5 w-5" />
                </Button>
              </SelectPrimitive.SelectTrigger>
            </div>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-slate-500">Suggested</SelectLabel>
                {children}
              </SelectGroup>
            </SelectContent>
          </Select>
        )
      }}
    />
  )
}
