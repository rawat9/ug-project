import { ContainerScroll } from './_components/ContainerScroll'
import { Hero } from './_components/Hero'
import { Features } from './_components/features'
import Image from 'next/image'

interface FeatureProps {
  title: string
  description: string
  icon: JSX.Element
}

function Feature({ title, description, icon }: FeatureProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-xl transition-all duration-300 hover:shadow-md">
      {icon}
      <h4 className="mb-4 mt-2 text-3xl font-semibold">{title}</h4>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default function Page() {
  return (
    <div className="overflow-hidden pb-[16.4rem]">
      <div className="mx-auto max-w-[120rem] px-8 pt-[6.4rem] md:pt-2">
        <ContainerScroll titleComponent={<Hero />}>
          <Image
            src="/demo-img.png"
            alt="Product demo image"
            width={1280}
            height={600}
            className="rounded-lg object-fill"
          />
        </ContainerScroll>
      </div>
      <Features />
    </div>
  )
}
