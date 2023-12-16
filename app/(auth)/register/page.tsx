import { AuthForm } from '@/components/authForm'
import { buttonVariants } from '@/components/ui/button'
import { Dashboard } from '@/icons'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account',
}

// TODO: sort css classes alphabetically
// TODO: sort imports alphabetically
export default function RegisterPage() {
  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href={'/login'}
        className={cn(
          buttonVariants({ variant: 'secondary' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Login
      </Link>
      <Dashboard className="absolute left-5 top-5 md:left-8 md:top-8 text-white w-10 h-10" />
      <div className="hidden h-full bg-gradient-to-b from-gray-700 via-gray-900 to-black lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <Dashboard className="mx-auto h-6 w-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  )
}
