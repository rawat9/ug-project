import { ChevronRight } from '@/icons'
import Link from 'next/link'

export function Hero() {
  return (
    <div className="text-center">
      <button className='relative rounded-full p-1 text-sm inline-flex items-center leading-6 bg-white text-gray-600 hover:shadow-xl duration-200 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
        <span className='pl-1'>Take the survey</span>{" "}
        <span className="rounded-full ml-2 p-1 bg-gray-100 border"><ChevronRight /></span>
      </button>
      <div className="my-6 translate-y-[-1rem] animate-fade-in bg-gradient-to-b from-slate-300 to-slate-700 bg-clip-text py-4 text-center text-6xl font-medium tracking-tight text-transparent opacity-0 [--animation-delay:200ms] md:text-7xl">
        Dashgen is a better way
        <br className="hidden md:block" /> to build dashboards
      </div>
      <p className="mb-12 translate-y-[-1rem] animate-fade-in text-lg opacity-0 [--animation-delay:500ms] md:text-xl">
        Empower Your Data, Create Your Vision
        <br className="hidden md:block" /> Dashboard Excellence Made Simple
      </p>
      <Link
        href="/auth/sign-up"
        className="group inline-flex items-center rounded-full bg-gradient-to-b from-slate-600 to-slate-900 px-5 py-2 text-white shadow-md transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-blue-400"
      >
        <span>Get Started</span>
        <span className="ml-1">
          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  )
}