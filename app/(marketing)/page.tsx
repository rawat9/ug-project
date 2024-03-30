import { buttonVariants } from '@/components/ui/button'
import { Collaborate, Data, Github, Box } from '@/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ContainerScroll } from './_components/ContainerScroll'
import Image from 'next/image'
import { Hero } from './_components/Hero'

interface FeatureProps {
  title: string
  description: string
  icon: JSX.Element
}

function Feature({ title, description, icon }: FeatureProps) {
  return (
    <div className="rounded-lg border p-6 transition-all duration-300 hover:shadow-md">
      {icon}
      <h4 className="mb-4 mt-2 font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="overflow-hidden pb-[16.4rem] md:pb-[25.6rem]">
      <div className="mx-auto max-w-[120rem] px-8">
        <Hero />
      </div>
      <img
        className="relative z-10 transition-opacity delay-700"
        src={
          'https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/8ab5dc31-5b91-4a8e-477c-afeb53cdd700/f=auto,q=95,fit=scale-down,metadata=none'
        }
        alt="hero image"
        width={800}
        height={600}
      />
    </div>
  )
}
