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
import { Label } from '@/components/ui/label'
import { ImportSpreadSheet } from './import-spreadsheet'
import { SheetFooter } from '@/components/ui/sheet'
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
import { toast } from 'react-hot-toast'
import { Table } from './types'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { createSQLTableQuery, insertSQLTableQuery } from './queries'
import { InputSelect } from './input-select'
import { useAtom } from 'jotai'
import { dataImportAtom } from './state'
import { executeQuery } from '@/lib/data/server/queries'
import { formSchema } from './form-schema'
import { RESET } from 'jotai/utils'
import { insertTable } from '@/lib/data/server/demo'

export function ColumnsForm({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void
}) {
  const { register, setValue, handleSubmit, control, watch, reset } =
    useForm<Table>()

  const { fields, remove, insert } = useFieldArray({
    control,
    name: 'columns',
  })

  const [valuesFromDataImport, set] = useAtom(dataImportAtom)

  React.useEffect(() => {
    if (valuesFromDataImport.columns.length) {
      setValue('name', valuesFromDataImport.name)

      // remove uuid field
      insert(0, valuesFromDataImport.columns)
    }
  }, [valuesFromDataImport, insert, remove, setValue])

  async function onSubmit(formData: Table) {
    // validate
    const result = formSchema.safeParse(formData)

    if (!result.success) {
      const errors = result.error.issues

      if (errors) {
        return toast.error(errors[0]?.message as string)
      }

      return toast.error('Something went wrong')
    }

    const tableData = result.data

    const primaryKeysCount =
      tableData.columns.filter((column) => column.options.primary).length > 1

    if (primaryKeysCount) {
      return toast.error('You can only have one primary key')
    }

    const createQuery = createSQLTableQuery(tableData)

    if (!createQuery) {
      return toast.error('Something went wrong')
    }

    // create table
    const { error } = await executeQuery(createQuery, null, true)

    if (error) {
      return toast.error(error.message)
    }

    toast.success(`Created table "${tableData.name}"`)

    if (valuesFromDataImport.data.length) {
      const insertQuery = insertSQLTableQuery(
        tableData,
        valuesFromDataImport.data,
      )

      if (!insertQuery) {
        return toast.error('Something went wrong')
      }

      // insert data into table
      const { error } = await executeQuery(insertQuery, null, true)

      if (error) {
        return toast.error(error.message)
      }

      await insertTable(tableData.name)
      set(RESET)
      reset()
      onOpenChange(false)
      toast.success(`Created table ${tableData.name}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <div className="h-[90%] overflow-y-auto">
        <div className="grid gap-4 px-4 py-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              autoComplete="off"
              className="col-span-3"
              {...register('name')}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Optional"
              className="col-span-3"
              {...register('description')}
            />
          </div>
        </div>
        <hr className="w-full border-gray-200" />
        <div className="flex items-center justify-between p-4">
          <h2 className="text-md font-medium">Columns</h2>
          <ImportSpreadSheet />
        </div>

        <div className="grid grid-flow-col grid-cols-[repeat(3,130px)] gap-3 px-6 pt-6">
          <Label className="flex items-center gap-1 text-xs text-slate-500">
            Name
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Help />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Recommended to use lowercase and use an underscore to
                    separate words e.g. column_name
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Label>
          <Label className="text-xs text-slate-500">Type</Label>
          <Label className="text-xs text-slate-500">Default Value</Label>
          <Label className="text-xs text-slate-500">Primary</Label>
        </div>

        <div className="flex flex-col gap-3 py-2 pb-4">
          {fields.map((item, index) => (
            <div
              className="grid grid-flow-col grid-cols-[repeat(3,130px)] items-center gap-3 px-6"
              key={item.id}
            >
              <Input
                autoComplete="off"
                placeholder="column_name"
                {...register(`columns.${index}.name`)}
              />
              <Controller
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <Select value={value} onValueChange={onChange}>
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
                )}
                name={`columns.${index}.type`}
                control={control}
              />
              <InputSelect
                name={`columns.${index}.default` as const}
                control={control}
              >
                {watch(`columns.${index}.type`) === 'uuid' ? (
                  <SelectItem value="gen_random_uuid()">
                    <div className="flex flex-col items-start gap-2">
                      <p className="font-mono text-slate-600">
                        gen_random_uuid()
                      </p>
                      <p className=" text-xs text-gray-400">
                        Generates a v4 UUID
                      </p>
                    </div>
                  </SelectItem>
                ) : watch(`columns.${index}.type`) === 'date' ? (
                  <SelectItem value="CURRENT_DATE">
                    <div className="flex flex-col items-start gap-2">
                      <p className="font-mono text-slate-600">CURRENT_DATE</p>
                      <p className=" text-xs text-gray-400">
                        Returns the current date
                      </p>
                    </div>
                  </SelectItem>
                ) : watch(`columns.${index}.type`) === 'timestamp' ? (
                  <SelectItem value="CURRENT_TIMESTAMP">
                    <div className="flex flex-col items-start gap-2">
                      <p className="font-mono text-slate-600">
                        CURRENT_TIMESTAMP
                      </p>
                      <p className=" text-xs text-gray-400">
                        Returns the current date and time
                      </p>
                    </div>
                  </SelectItem>
                ) : null}
              </InputSelect>
              <Controller
                control={control}
                defaultValue={false}
                name={`columns.${index}.options.primary`}
                render={({ field: { value, onChange } }) => (
                  <Checkbox checked={value} onCheckedChange={onChange} />
                )}
              />
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Extra options</DropdownMenuLabel>
                    <Controller
                      control={control}
                      defaultValue={false}
                      name={`columns.${index}.options.unique`}
                      render={({ field: { value, onChange } }) => (
                        <DropdownMenuCheckboxItem
                          checked={value}
                          onCheckedChange={onChange}
                        >
                          Unique
                        </DropdownMenuCheckboxItem>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`columns.${index}.options.nullable`}
                      render={({ field: { value, onChange } }) => (
                        <DropdownMenuCheckboxItem
                          checked={!value}
                          onCheckedChange={onChange}
                        >
                          Not null
                        </DropdownMenuCheckboxItem>
                      )}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 self-center"
                  onClick={() => {
                    remove(index)
                    const key = item.name
                    valuesFromDataImport.data.map((row) => {
                      delete row[key]
                    })
                  }}
                >
                  <Cross className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {/* <Button
          variant="outline"
          size="sm"
          className="m-4 h-6"
          type="button"
          onClick={(e) => {
            e.preventDefault()
            append({
              name: '',
              type: '',
              default: '',
              options: {
                primary: false,
                nullable: true,
                unique: false,
              },
            })
          }}
        >
          Add column
        </Button> */}
      </div>
      <SheetFooter className="h-[5%] items-center border-t px-4 py-2">
        <Button type="submit" className="h-8">
          Save changes
        </Button>
      </SheetFooter>
    </form>
  )
}
