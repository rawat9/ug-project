import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createDashboard } from '@/lib/data'

export function CreateForm() {
  return (
    <form action={createDashboard}>
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-2">
          <Label htmlFor="title" className="col-span-4">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g Most famous dashboard"
            className="col-span-4"
            required
          />
        </div>
        <Button type="submit" className="col-span-1 mt-2 justify-self-end">
          Save changes
        </Button>
      </div>
    </form>
  )
}
