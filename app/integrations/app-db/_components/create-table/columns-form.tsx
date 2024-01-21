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
import { Cross } from '@/icons'
import { Checkbox } from '@/components/ui/checkbox'
import { useAtom, useAtomValue } from 'jotai'
import { createTableAtom } from './state'
import { Label } from '@/components/ui/label'
import { ImportSpreadSheet } from './import-spreadsheet'

export function ColumnsForm() {
  const [inputs, setInputs] = useAtom(createTableAtom)

  function addInputs() {
    setInputs({
      ...inputs,
      columns: [...inputs.columns, { name: '', type: '', default: '' }],
    })
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

  return (
    <>
      <div className="grid gap-4 px-4 py-8">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-left">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            autoComplete="off"
            defaultValue={inputs.tableName}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-left">
            Description
          </Label>
          <Input
            id="description"
            name="description"
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
        <Label className="text-xs text-slate-500">Name</Label>
        <Label className="text-xs text-slate-500">Type</Label>
        <Label className="text-xs text-slate-500">Default</Label>
      </div>
      <div className="flex flex-col gap-3 pb-4">
        {inputs.columns.map((input, index) => (
          <div className="grid grid-cols-4 gap-3 px-6" key={index}>
            <Input
              name="name"
              autoComplete="off"
              defaultValue={input.name}
              onChange={(e) => handleChange('name', e.target.value, index)}
            />
            <Select
              name="type"
              defaultValue={input.type}
              onValueChange={(value) => handleChange('type', value, index)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Data types</SelectLabel>
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
              defaultValue={input.default}
              placeholder="NULL"
              onChange={(e) => handleChange('default', e.target.value, index)}
            />
            <div>
              <Checkbox checked={true}></Checkbox>
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
        onClick={addInputs}
      >
        Add column
      </Button>
    </>
  )
}
