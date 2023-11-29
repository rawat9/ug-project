import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-28 space-y-6">
        <div className="max-w-lg mb-24">
          <h1 className="font-extrabold text-5xl leading-tight mb-5">
            Build dashboards in seconds!
          </h1>
          <p className="text-lg text-slate-600 leading-normal text-muted-foreground sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing
            everything. Follow along as we figure this out together.
          </p>
          {/* <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link>
          </div> */}
        </div>
        <h2 className="font-semibold text-xl">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6">Typescript</h4>
            <p className="text-sm">Description</p>
          </div>
          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6">Angular</h4>
            <p className="text-sm">Description</p>
          </div>

          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6"></h4>
            <p className="text-sm">Description</p>
          </div>

          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6"></h4>
            <p className="text-sm">Description</p>
          </div>

          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6"></h4>
            <p className="text-sm">Description</p>
          </div>

          <div className="rounded-lg border p-6">
            <h4 className="font-semibold mb-6"></h4>
            <p className="text-sm">Description</p>
          </div>
        </div>
      </section>
    </>
  )
}
