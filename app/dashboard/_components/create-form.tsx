import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createDashboard } from '@/lib/data'

export function CreateForm() {
  return (
    <form action={createDashboard}>
      <div className="mt-6 grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="e.g Sales dashboard"
            className="placeholder:text-muted-foreground col-span-4"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            placeholder="Optional"
            className="placeholder:text-muted-foreground flex min-h-[60px] w-full resize-none rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950"
          />
        </div>
        <Button type="submit" className="col-span-1 mt-2 justify-self-end">
          Save changes
        </Button>
      </div>
    </form>
  )
}
