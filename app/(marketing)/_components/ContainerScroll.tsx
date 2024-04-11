'use client'

import React from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import ModalVideo from './VideoPlayer'
import { Hero } from './Hero'

interface CardProps {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate: MotionValue<number>
  children: React.ReactNode
}

export const ContainerScroll = () => {
  const containerRef = React.useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      className="relative flex h-[60rem] animate-fade-in items-center justify-center p-2 opacity-0 [--animation-delay:800ms] md:h-[80rem] md:p-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: '1000px',
        }}
      >
        <Header translate={translate} titleComponent={<Hero />} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          <ModalVideo
            video="/first-rec.mov"
            videoWidth={1920}
            videoHeight={1080}
          />
        </Card>
      </div>
    </div>
  )
}

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({ rotate, scale, children }: CardProps) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="mx-auto mb-8 w-full max-w-6xl rounded-[30px] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl"
    >
      <div className="w-full overflow-hidden rounded-2xl bg-gray-100 p-1 dark:bg-zinc-900 md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  )
}
