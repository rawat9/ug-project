import { Postgres, Connection, Help } from '@/icons'
import { BackButton } from './_components/back-button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ConnectionForm } from './_components/connection-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Page() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto flex max-w-screen-xl flex-col px-4 py-32">
        <div className="flex items-center justify-between border-b pb-4">
          <BackButton />
          <div className="flex items-center gap-3">
            <Connection className="h-6 w-6" />
            <h1 className="text-xl font-medium">Select an integration type</h1>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-4 py-8 sm:grid-cols-3 lg:grid-cols-4">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                <Postgres className="h-12 w-12" />
                <p className="font-medium">PostgreSQL</p>
              </div>
            </SheetTrigger>
            <SheetContent className="min-w-[800px]">
              <SheetHeader className="h-[5%] border-b px-4 py-2">
                <SheetTitle>PostgreSQL</SheetTitle>
              </SheetHeader>
              <ConnectionForm />
              <div className="p-4">
                <Alert>
                  <Help className="h-5 w-5" />
                  <AlertTitle className="py-1">Heads up!</AlertTitle>
                  <AlertDescription>
                    The database credentials you provide are encrypted and
                    stored securely using{' '}
                    <a
                      className="font-medium underline underline-offset-4"
                      href="https://aws.amazon.com/kms/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      AWS KMS
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
