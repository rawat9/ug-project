import { Box, Collaborate, Data } from '@/icons'

const features = [
  {
    title: 'Data Integration',
    description: 'Connect your data sources and start analyzing your data.',
    icon: Data,
  },
  {
    title: 'Widgets',
    description: 'Customize your dashboard with widgets that fit your needs.',
    icon: Box,
  },
  {
    title: 'Publish',
    description: 'Publish your dashboard to share with your team or clients.',
    icon: Collaborate,
  },
]

export function Features() {
  return (
    <div className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="rounded-full font-semibold leading-7 text-slate-600">
            Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to build your dashboard
          </p>
          <p className="mt-6 text-md leading-8 text-slate-500">
            Here&apos;s how Dashgen empowers you to visualize, analyze, and make informed decisions
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="relative pl-16 rounded-xl transition duration-500 p-3 hover:shadow-xl hover:bg-white">
                <dt className="font-semibold leading-7 text-gray-900">
                  <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
