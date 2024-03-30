import { ChevronRight } from '@/icons'
import Image from 'next/image'

export function Hero() {
  return (
    <div className="text-center">
      <div className="my-6 mt-12 translate-y-[-1rem] animate-fade-in bg-gradient-to-br from-slate-300 to-slate-600 bg-clip-text py-4 text-center text-6xl font-medium tracking-tight text-transparent opacity-0 [--animation-delay:200ms] md:text-7xl">
        Linear is a better way
        <br className="hidden md:block" /> to build products
      </div>
      <p className="mb-12 translate-y-[-1rem] animate-fade-in text-pretty text-lg opacity-0 [--animation-delay:400ms] md:text-xl">
        Meet the new standard for modern software development.
        <br className="hidden md:block" /> Streamline issues, sprints, and
        product roadmaps.
      </p>
      <button className="inline-flex items-center rounded-full bg-gradient-to-b from-slate-600 to-slate-800 px-5 py-2 text-white transition duration-200 hover:shadow-xl focus:ring-2 focus:ring-blue-400">
        <span>Get Started</span>
        <span className="ml-1">
          <ChevronRight className="h-4 w-4" />
        </span>
      </button>
      {/* <img
        className="relative z-10  transition-opacity delay-700"
        src={
          'https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/8ab5dc31-5b91-4a8e-477c-afeb53cdd700/f=auto,q=95,fit=scale-down,metadata=none'
        }
        alt="hero image"
        width={800}
        height={600}
      /> */}
    </div>
  )
}
