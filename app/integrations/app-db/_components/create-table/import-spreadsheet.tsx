import { DataImport } from './data-import'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export function ImportSpreadSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="h-6">
          Import data from spreadsheet
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[600px]">
        <SheetHeader className="h-[5%] border-b px-4 py-2">
          <SheetTitle>Import your data</SheetTitle>
        </SheetHeader>
        <DataImport />
      </SheetContent>
    </Sheet>
  )
}
