import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Add } from '@/icons'
import { Button } from '@/components/ui/button'
import { ColumnsForm } from './columns-form'

export function CreateTable() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto mr-2 h-6 bg-white"
          size="sm"
        >
          <Add className="mr-1 h-3 w-3" />
          New table
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px]">
        <SheetHeader className="h-[5%] border-b px-4 py-2">
          <SheetTitle>Create a new table</SheetTitle>
        </SheetHeader>
        <ColumnsForm />
      </SheetContent>
    </Sheet>
  )
}
