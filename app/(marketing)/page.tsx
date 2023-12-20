import { buttonVariants } from '@/components/ui/button'
import { Collaborate, Data, Github, Widgets } from '@/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface FeatureProps {
  title: string
  description: string
  icon: JSX.Element
}

function Feature({ title, description, icon }: FeatureProps) {
  return (
    <div className="rounded-lg border p-6 hover:shadow-md">
      {icon}
      <h4 className="mb-4 mt-2 font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default function Page() {
  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-28">
        <section className="mb-24 max-w-lg">
          <h1 className="mb-5 text-5xl font-extrabold leading-tight">
            Build dashboards in seconds!
          </h1>
          <p className="text-lg text-slate-600 sm:leading-8">
            Empower Your Insights, Customize Your View: Your Data, Your
            Dashboards
          </p>
          <div className="space-y-4">
            <Link
              href={'/dashboard'}
              className={cn(buttonVariants({ size: 'sm' }), 'mr-2')}
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/rawat9/ug-project"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              GitHub
              <Github className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        <h2 className="text-xl font-semibold">Features</h2>
        <section className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
          <Feature
            title="Data Integration"
            description="Connect to the data sources of your choice"
            icon={<Data className="h-12 w-12" />}
          />

          <Feature
            title="Templates and Widgets"
            description="A library of customizable widgets for quick dashboard creation"
            icon={<Widgets className="h-12 w-12" />}
          />

          <Feature
            title="Sharing and Collaboration"
            description="Share dashboards securely and collaborate with team members"
            icon={<Collaborate className="h-12 w-12" />}
          />
        </section>
      </div>
    </>
  )
}
