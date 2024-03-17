import { ClerkProvider } from '@clerk/nextjs'

export const ClerkAuthProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#0f172a' },
        elements: {
          formFieldInput:
            'flex h-9 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
          card: 'rounded-xl border border-slate-200',
        },
      }}
    >
      {children}
    </ClerkProvider>
  )
}
