'use client'

import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/icons'
import { signIn } from '@/lib/actions'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

export function AuthForm() {
  const authSchema = z.object({
    email: z.string().email(),
  })

  type FormData = z.infer<typeof authSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(authSchema),
  })

  async function onSubmit(formData: FormData) {
    const { error } = await signIn({
      email: formData.email,
    })

    if (error) {
      return toast.error('Your request has been failed. Please try again.')
    }

    toast.success('Check your email for the magic link!')
    reset()
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
              placeholder="e.g name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('email')}
            />
            {errors?.email && (
              <p
                className="px-1 text-xs text-red-600"
                data-testid="error-message"
              >
                {errors.email.message}
              </p>
            )}
          </div>
          <Button type={'submit'} size={'lg'} disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
    </div>
  )
}
