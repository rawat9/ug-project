'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { SheetFooter } from '@/components/ui/sheet'
import { ChevronRight } from '@/icons'
import { formSchema } from './form-schema'
import toast from 'react-hot-toast'
import { createIntegration } from '@/lib/data/integrations'
import { DevTool } from '@hookform/devtools'

export function ConnectionForm() {
  const [connString, toggleConnString] = React.useState(false)

  const { handleSubmit, register, reset, unregister, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })

  const handleChange = () => {
    if (connString) {
      unregister('connectionString')
      register('details')
      return toggleConnString(!connString)
    }
    register('connectionString')
    unregister('details')
    return toggleConnString(!connString)
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
    const result = formSchema.safeParse(data)

    if (!result.success) {
      const errors = result.error.issues

      if (errors) {
        return toast.error(errors[0]?.message as string)
      }

      return toast.error('Something went wrong')
    }

    // if (data.connectionString) {
    //   console.log('Creating integration with connection string')
    //   await createIntegration(data.connectionString)
    // }

    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 p-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
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
            <Label htmlFor="description" className="text-right">
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
        <div className="grid gap-4 p-8">
          <div className="flex items-center justify-between pb-8">
            <h2 className="pl-2 text-sm font-semibold uppercase text-slate-500">
              General
            </h2>
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={handleChange}
              className="h-6"
            >
              {connString ? 'Enter details manually' : 'Use connection string'}
            </Button>
          </div>
          {connString ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="connectionString" className="text-right">
                Connection String
              </Label>
              <Input
                className="col-span-3"
                id="connectionString"
                autoComplete="off"
                placeholder="postgresql://dbuser:secretpassword@database.server:5432/mydb"
                {...register('connectionString')}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">
                  Host
                </Label>
                <Input
                  id="host"
                  autoComplete="off"
                  className="col-span-3"
                  {...register('details.host')}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  Port
                </Label>
                <Input
                  id="port"
                  className="col-span-3"
                  defaultValue={5432}
                  {...register('details.port')}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="database" className="text-right">
                  Database Name
                </Label>
                <Input
                  id="database"
                  placeholder="accounts_db"
                  className="col-span-3"
                  {...register('details.database')}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Database username
                </Label>
                <Input
                  id="username"
                  autoComplete="on"
                  placeholder="postgres"
                  className="col-span-3"
                  {...register('details.username')}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Database password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="••••••••"
                  className="col-span-3"
                  {...register('details.password')}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ssl" className="text-right">
                  Use SSL
                </Label>
                <Checkbox id="ssl" {...register('details.ssl')} />
              </div>
            </>
          )}
          <SheetFooter className="items-center py-8">
            <Button type="button" variant={'secondary'}>
              Test connection
            </Button>
            <Button type="submit">
              Create integration
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SheetFooter>
        </div>
      </form>
      <DevTool control={control} />
    </>
  )
}
