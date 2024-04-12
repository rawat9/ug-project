import { ContainerScroll } from './_components/ContainerScroll'
import { Features } from './_components/features'

export default function Page() {
  return (
    <div className="overflow-hidden pb-[16.4rem]">
      <div className="mx-auto max-w-[120rem] px-8 pt-[6.4rem] md:pt-2">
        <ContainerScroll />
      </div>
      <Features />
    </div>
  )
}
