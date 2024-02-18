import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Add, Filter } from '@/icons'

export function Filters() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8">
          <Filter className="mr-1 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0">
        {/* <div className="grid gap-4"> */}
        {/* <div className="space-y-2">
            <h4 className="font-medium leading-none"></h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div> */}
        <div className="grid grid-cols-[150px_80px_auto] items-center gap-2 p-3">
          <Select defaultValue="first_name">
            <SelectTrigger>
              <SelectValue className="h-8" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="first_name">first_name</SelectItem>
              <SelectItem value="last_name">last_name</SelectItem>
              <SelectItem value="age">age</SelectItem>
              <SelectItem value="visits">visits</SelectItem>
              <SelectItem value="status">visits</SelectItem>
              <SelectItem value="progress">visits</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue className="h-8" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="="> = equals to</SelectItem>
              <SelectItem value="<"> {'<'} less than</SelectItem>
              <SelectItem value=">"> {'>'} greater than</SelectItem>
              <SelectItem value="<=">{'<='} less than or equal to</SelectItem>
              <SelectItem value=">=">
                {'>='} greater than or equal to
              </SelectItem>
              <SelectItem value="in">in - one of the values</SelectItem>
              <SelectItem value="is">
                is - checking for (null, true, false)
              </SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Enter value" />
        </div>
        <div className="mt-1 h-px bg-gray-200" />
        <div className="flex justify-between px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 p-0 hover:bg-transparent"
          >
            <Add className="mr-1 h-4 w-4" />
            Add filter
          </Button>
          <Button size="sm" variant="outline" className="h-7">
            Apply filter
          </Button>
        </div>
        {/* </div> */}
      </PopoverContent>
    </Popover>
  )
}
