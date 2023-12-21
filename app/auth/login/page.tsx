import { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ChevronLeft } from '@/icons'
import { AuthForm } from '@/components/auth-form'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
}

export default function Page() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign up or log in
          </h1>
          <p className="text-sm text-slate-600">
            Enter your email to log in or create an account
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
