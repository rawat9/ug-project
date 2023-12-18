import { Button } from '@/components/ui/button'
import { Add } from '@/icons'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Search } from '@/components/search'
import Image from 'next/image'

export default function DashboardPage() {
  const projectsCount = 1

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50">
        {projectsCount > 0 ? (
          <div className="mx-auto flex max-w-screen-lg flex-col px-4 py-36">
            <div className="flex items-center space-x-2">
              <Search />
              <Button>
                <Add />
                <p className="ml-2 hidden sm:flex">Add New</p>
              </Button>
            </div>
            <div className="grid gap-4 py-10 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: projectsCount }).map((_, i) => (
                <Link
                  href={`/dashboard/${i + 1}`}
                  aria-label="Open dashboard"
                  key={i}
                >
                  <div className="min-h-[150px] cursor-pointer rounded-lg border bg-white p-4 shadow-sm hover:shadow-md">
                    <h4 className="py-2 font-semibold">Dashboard {i + 1}</h4>
                    <p className="text-sm">
                      This is an empty dashboard document
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <Image
              src="/empty-dashboard.svg"
              alt="Empty dashboard"
              width={400}
              height={300}
            />
            <h1 className="mb-2 text-2xl font-semibold">
              Start building your dashboard!
            </h1>
            <h4 className={'mb-3 text-center text-sm text-gray-500'}>
              <p>Every dashboard you create will appear here.</p>
              To get started, click the button below
            </h4>
            <Button variant="ghost" aria-label="Create a new dashboard">
              <Add />
              <p className="ml-2 flex">Add New</p>
            </Button>
          </div>
        )}
      </main>
    </>
  )
}
