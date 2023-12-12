import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Add, Search } from '@/icons'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-16 overflow-y-hidden">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5" />
          <Input type="search" placeholder="Search..." />
          <Button>
            <Add />
            <p className="hidden sm:flex ml-2">Add New</p>
          </Button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <Link
              href={`/dashboard/${i + 1}`}
              aria-label="Open dashboard"
              key={i}
            >
              <div className="rounded-lg border p-4 bg-white shadow-sm hover:shadow-md cursor-pointer min-h-[150px]">
                <h4 className="font-semibold py-2">Dashboard {i + 1}</h4>
                <p className="text-sm">This is an empty dashboard document</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
