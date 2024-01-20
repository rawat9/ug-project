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
        <div className="grid gap-4 px-4 py-8">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              autoComplete="off"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Optional"
              className="col-span-3"
            />
          </div>
        </div>
        <hr className="w-full border-gray-200" />
        <div className="flex items-center justify-between p-4">
          <h2 className="text-md font-medium">Columns</h2>
          <ImportSpreadSheet />
        </div>
        {/* Labels */}
        <div className="grid grid-cols-4 gap-3 px-6 py-2">
          <Label className="text-xs text-slate-500">Name</Label>
          <Label className="text-xs text-slate-500">Type</Label>
          <Label className="text-xs text-slate-500">Default</Label>
        </div>
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
