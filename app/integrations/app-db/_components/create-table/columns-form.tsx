'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { dataTypes } from './data-types'
import { Cross, Help, Settings } from '@/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { useAtom } from 'jotai'
import { createTableAtom } from './state'
import { Label } from '@/components/ui/label'
import { ImportSpreadSheet } from './import-spreadsheet'
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { createSQLTableQuery } from './create-table-query'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ColumnsForm() {
  const [inputs, setInputs] = useAtom(createTableAtom)
  // const [nullable, setNullable] = React.useState(false)

  function addInputs() {
    setInputs({
      ...inputs,
      columns: [
        ...inputs.columns,
        {
          name: '',
          type: '',
          default: '',
          options: { primary: false, nullable: false, unique: false },
        },
      ],
    })
  }

  function handleSomething() {
    createSQLTableQuery(inputs)
  }

  const handleChange = React.useCallback(
    (name: string, value: string, index: number) => {
      const onChangeValue = [...inputs.columns]
      // @ts-ignore
      onChangeValue[index][name] = value
      setInputs({ ...inputs, columns: onChangeValue })
    },
    [inputs, setInputs],
  )

  const handleRemove = React.useCallback(
    (index: number) => {
      const onChangeValue = [...inputs.columns]
      onChangeValue.splice(index, 1)
      setInputs({ ...inputs, columns: onChangeValue })
    },
    [inputs, setInputs],
  )

  const handleNullable = React.useCallback(
    (index: number) => {
      const onChangeValue = [...inputs.columns]
      console.log(onChangeValue[index])
      // @ts-ignore
      onChangeValue[index][options].nullable =
        // @ts-ignore
        !onChangeValue[index][options].nullable
      console.log(onChangeValue[index])
      setInputs({ ...inputs, columns: onChangeValue })
    },
    [inputs, setInputs],
  )

  return (
    <>
      <div className="grid gap-4 px-4 py-8">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tableName" className="text-left">
            Name
          </Label>
          <Input
            id="tableName"
            name="tableName"
            autoComplete="off"
            defaultValue={inputs.name}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tableDescription" className="text-left">
            Description
          </Label>
          <Input
            id="tableDescription"
            name="tableDescription"
            placeholder="Optional"
            className="col-span-3"
          />
        </div>
      </div>
      <hr className="w-full border-gray-200" />
      <div className="flex items-center justify-between p-4">
        <h2 className="text-md font-medium">Columns</h2>
        <ImportSpreadSheet />
      </div>

      {/* Labels */}
      <div className="grid grid-cols-4 gap-3 px-6 py-2">
        <Label className="flex items-center gap-1 text-xs text-slate-500">
          Name
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Help />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Recommended to use lowercase and use an underscore to separate
                  words e.g. column_name
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Label className="text-xs text-slate-500">Type</Label>
        <Label className="text-xs text-slate-500">Default Value</Label>
        <Label className="text-xs text-slate-500">Primary</Label>
      </div>

      <div className="flex max-h-[570px] flex-col gap-3 overflow-y-auto py-1 pb-4">
        {inputs.columns.map((input, index) => (
          <div className="grid grid-cols-4 gap-3 px-6" key={index}>
            <Input
              name="name"
              autoComplete="off"
              value={input.name}
              placeholder="column_name"
              onChange={(e) => handleChange('name', e.target.value, index)}
            />
            <Select
              name="type"
              value={input.type}
              onValueChange={(value) => handleChange('type', value, index)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-slate-500">
                    Data types
                  </SelectLabel>
                  {dataTypes.map((type, index) => (
                    <SelectItem key={index} value={type.name}>
                      <div className="flex items-center gap-3">
                        <p>{type.name}</p>
                        <p className="text-xs text-gray-400">
                          {type.description}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              name="default"
              value={input.default}
              placeholder="NULL"
              autoComplete="off"
              onChange={(e) => handleChange('default', e.target.value, index)}
            />
            <div className="flex items-center">
              <Checkbox />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Column options</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem>Primary</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={input.options.nullable}
                    onCheckedChange={() => handleNullable(index)}
                  >
                    Unique
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Auto Increment
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Not Null</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 self-center"
                onClick={() => handleRemove(index)}
              >
                <Cross className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        size="sm"
        className="m-4 h-6"
        type="submit"
        onClick={addInputs}
      >
        Add column
      </Button>
      <SheetFooter className="p-4">
        <SheetClose asChild>
          <Button type="submit" onClick={handleSomething}>
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
