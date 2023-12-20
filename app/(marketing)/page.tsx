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
      <h4 className="font-semibold mb-4 mt-2">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-28 space-y-6">
        <section className="max-w-lg mb-24">
          <h1 className="font-extrabold text-5xl leading-tight mb-5">
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
              <Github className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>

        <h2 className="font-semibold text-xl">Features</h2>
        <section className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
          <Feature
            title="Data Integration"
            description="Connect to the data sources of your choice"
            icon={<Data className="w-12 h-12" />}
          />

          <Feature
            title="Templates and Widgets"
            description="A library of customizable widgets for quick dashboard creation"
            icon={<Widgets className="w-12 h-12" />}
          />

          <Feature
            title="Sharing and Collaboration"
            description="Share dashboards securely and collaborate with team members"
            icon={<Collaborate className="w-12 h-12" />}
          />
        </section>
      </div>
    </>
  )
}
