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

export function ConnectionForm() {
  const [connString, toggleConnString] = React.useState(false)

  const FormSchema = z
    .object({
      name: z
        .string()
        .min(1, { message: 'Name of the integration is required' }),
      description: z.string().optional(),
      host: z.string(),
      port: z.string(),
      username: z.string(),
      password: z.string(),
      database: z.string(),
      ssl: z.string(),
    })
    .or(
      z.object({
        connectionString: z.string().min(1, {
          message: 'Connection string is required',
        }),
      }),
    )

  const { handleSubmit, register } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
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
          <h2 className="text-md pl-2 font-medium">General</h2>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => {
              toggleConnString((prev) => !prev)
            }}
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
              id="connectionString"
              placeholder="postgresql://dbuser:secretpassword@database.server:5432/mydb"
              autoComplete="off"
              className="col-span-3"
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
                {...register('host')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">
                Port
              </Label>
              <Input id="port" className="col-span-3" {...register('port')} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="database" className="text-right">
                Database Name
              </Label>
              <Input
                id="database"
                placeholder="awesome_db"
                className="col-span-3"
                {...register('database')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Database username
              </Label>
              <Input
                id="username"
                placeholder="postgres"
                className="col-span-3"
                {...register('username')}
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
                {...register('password')}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ssl" className="text-right">
                Use SSL
              </Label>
              <Checkbox id="ssl" {...register('ssl')} />
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
  )
}
