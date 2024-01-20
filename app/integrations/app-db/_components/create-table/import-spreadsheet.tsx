import { ExcelImport } from './excel-import2'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function ImportSpreadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={'sm'} className="h-6">
          Import data from spreadsheet
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px]">
        <SheetHeader className="h-[5%] border-b px-4 py-2">
          <SheetTitle>Import your data</SheetTitle>
        </SheetHeader>
        <ExcelImport />
        <SheetFooter className="h-[5%] items-center border-t px-4 py-2">
          <SheetClose asChild>
            <Button type="submit" className="h-8">
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
