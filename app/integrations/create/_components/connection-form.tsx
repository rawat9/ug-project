'use client'

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
import { createIntegration, testConnection } from '@/lib/data/integrations'
import { DevTool } from '@hookform/devtools'
import { TextInput, NumberInput } from '@tremor/react'

export function ConnectionForm() {
  const [connString, toggleConnString] = React.useState(false)
  const [isTesting, setIsTesting] = React.useState(false)
  const [connectionSuccessful, setConnectionSuccessful] = React.useState(false)

  const {
    handleSubmit,
    register,
    reset,
    unregister,
    control,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
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
    const result = formSchema.safeParse(data)

    if (!result.success) {
      const errors = result.error.issues

      if (errors) {
        return toast.error(errors[0]?.message as string)
      }

      return toast.error('Something went wrong')
    }

    if (data.connectionString) {
      await createIntegration(
        data.name,
        data.description ?? '',
        data.connectionString,
      )
    }

    reset()
  }

  async function handleTestConnection() {
    const values = getValues()
    const result = formSchema.safeParse(values)

    if (!result.success) {
      const errors = result.error.issues

      if (errors) {
        return toast.error(errors[0]?.message as string)
      }

      return toast.error('Something went wrong')
    }

    if (result.data.connectionString) {
      setIsTesting(true)
      toast.promise(testConnection(result.data.connectionString), {
        loading: 'Testing connection...',
        success: () => {
          setConnectionSuccessful(true)
          return 'Connection successful'
        },
        error: 'Connection failed',
      })
      setIsTesting(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 p-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <TextInput
              id="name"
              autoComplete="off"
              placeholder="my-postgres-db"
              className="col-span-3"
              error={errors.name !== undefined}
              {...register('name')}
            />
            {errors.name && (
              <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <TextInput
              id="description"
              autoComplete="off"
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
              <TextInput
                id="connectionString"
                className="col-span-3"
                autoComplete="off"
                placeholder="postgresql://dbuser:secretpassword@database.server:5432/mydb"
                error={errors.connectionString !== undefined}
                {...register('connectionString')}
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="host" className="text-right">
                  Host
                </Label>
                <TextInput
                  id="host"
                  autoComplete="off"
                  className="col-span-3"
                  error={errors.details?.host !== undefined}
                  {...register('details.host')}
                />
                {errors.details?.host && (
                  <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                    {errors.details?.host?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="port" className="text-right">
                  Port
                </Label>
                <NumberInput
                  id="port"
                  autoComplete="off"
                  className="col-span-3"
                  defaultValue="5432"
                  enableStepper={false}
                  error={errors.details?.port !== undefined}
                  {...register('details.port', { valueAsNumber: true })}
                />
                {errors.details?.port && (
                  <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                    {errors.details?.port?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="database" className="text-right">
                  Database Name
                </Label>
                <TextInput
                  id="database"
                  autoComplete="off"
                  className="col-span-3"
                  placeholder="my-database"
                  error={errors.details?.database !== undefined}
                  {...register('details.database')}
                />
                {errors.details?.database && (
                  <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                    {errors.details?.database?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Database username
                </Label>
                <TextInput
                  id="username"
                  autoComplete="off"
                  placeholder="postgres"
                  className="col-span-3"
                  error={errors.details?.username !== undefined}
                  {...register('details.username')}
                />
                {errors.details?.username && (
                  <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                    {errors.details?.username?.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Database password
                </Label>
                <TextInput
                  id="password"
                  type="password"
                  autoComplete="off"
                  placeholder="••••••••"
                  className="col-span-3"
                  error={errors.details?.password !== undefined}
                  {...register('details.password')}
                />
                {errors.details?.password && (
                  <p className="col-span-3 col-start-2 -mt-3 text-xs text-red-500">
                    {errors.details?.password?.message}
                  </p>
                )}
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
            <Button
              type="button"
              variant={'outline'}
              onClick={handleTestConnection}
              disabled={isTesting}
            >
              Test connection
            </Button>
            <Button type="submit" disabled={isTesting || !connectionSuccessful}>
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
