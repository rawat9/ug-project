import { Button } from '@/components/ui/button'
import { Add } from '@/icons'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Search } from '@/components/search'

export default function DashboardPage() {
  const projectsCount = 1

  return (
    <>
      <Header />
      <main className="bg-zinc-50 min-h-[calc(100vh_-_4rem)]">
        <div className="flex flex-col max-w-screen-lg mx-auto px-4 pt-16 overflow-y-hidden">
          {projectsCount > 0 ? (
            <>
              <div className="flex items-center space-x-2">
                <Search />
                <Button>
                  <Add />
                  <p className="hidden sm:flex ml-2">Add New</p>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Link
                    href={`/dashboard/${i + 1}`}
                    aria-label="Open dashboard"
                    key={i}
                  >
                    <div className="rounded-lg border p-4 bg-white shadow-sm hover:shadow-md cursor-pointer min-h-[150px]">
                      <h4 className="font-semibold py-2">Dashboard {i + 1}</h4>
                      <p className="text-sm">
                        This is an empty dashboard document
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col w-8/12 place-self-center rounded-lg border min-h-[300px] bg-white justify-center items-center shadow-sm my-10">
              <h2 className="text-2xl font-semibold text-center mb-2">
                No projects yet!
              </h2>
              <Button>
                <Add />
                <p className="hidden sm:flex ml-2">Add New</p>
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
