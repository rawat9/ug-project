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

export function ColumnsForm() {
  const [inputs, setInputs] = React.useState([
    {
      name: '',
      type: '',
      default: '',
    },
  ])

  function addInputs() {
    setInputs((prev) => [...prev, { name: '', type: '', default: '' }])
  }

  const handleChange = React.useCallback(
    (name: string, value: string, index: number) => {
      const onChangeValue = [...inputs]
      // @ts-ignore
      onChangeValue[index][name] = value
      setInputs(onChangeValue)
    },
    [inputs],
  )

  const handleRemove = React.useCallback(
    (index: number) => {
      const onChangeValue = [...inputs]
      onChangeValue.splice(index, 1)
      setInputs(onChangeValue)
    },
    [inputs],
  )

  return (
    <>
      <form className="flex flex-col gap-3 pb-4">
        {inputs.map((input, index) => (
          <div className="grid grid-cols-4 gap-3 px-6" key={index}>
            <Input
              name="name"
              autoComplete="off"
              value={input.name}
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
                  <SelectLabel>PostgreSQL data types</SelectLabel>
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
      </form>
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
