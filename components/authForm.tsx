'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Github } from '@/icons'
import { buttonVariants } from './ui/button'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'
import signInWithOtp from '@/lib/supabase/actions'

export function AuthForm() {
  const authSchema = z.object({
    email: z.string().email(),
  })
  const [isLoading, setIsLoading] = useState(false)

  type FormData = z.infer<typeof authSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })

  async function onSubmit(formData: FormData) {
    setIsLoading(true)

    const { data, error } = await signInWithOtp({
      email: formData.email,
      options: {
        shouldCreateUser: false,
      },
    })
    setIsLoading(false)

    if (error) {
      return toast.error('Your request has been failed. Please try again.')
    }

    toast.success('Check your email for the magic link!')
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button className={cn(buttonVariants())}>Sign In with Email</button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-slate-400">Or continue with</span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </button>
    </div>
  )
}
