import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'
import { Add } from '@/icons'
import { Label } from '@/components/ui/label'
import { ImportSpreadSheet } from './import-spreadsheet'
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
        <SheetHeader className="border-b px-4 py-2">
          <SheetTitle>Create a new table</SheetTitle>
        </SheetHeader>
        <ColumnsForm />
        <SheetFooter className="p-4">
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
