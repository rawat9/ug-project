'use client'

import { useState, useRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'

interface ModalVideoProps {
  video: string
  videoWidth: number
  videoHeight: number
}

export default function VideoPlayer({
  video,
  videoWidth,
  videoHeight,
}: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="flex justify-center">
      <button
        className="group relative flex items-center justify-center rounded-3xl focus:outline-none focus-visible:ring focus-visible:ring-indigo-300"
        onClick={() => {
          setModalOpen(true)
        }}
        aria-label="Watch the video"
      >
        <Image
          src="/demo-img.png"
          alt="Product demo image"
          width={2280}
          height={1400}
          className="rounded-lg duration-300 animate-out group-hover:opacity-70"
          priority
        />
        <svg
          className="pointer-events-none absolute h-12 w-12 transition-transform duration-300 ease-in-out group-hover:scale-110"
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"
          />
        </svg>
      </button>

      <Transition
        show={modalOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
          <Transition.Child
            className="fixed inset-0 z-[99999] bg-black bg-opacity-50 p-2 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />

          <Transition.Child
            className="fixed inset-0 z-[99999] flex px-4 py-6 md:px-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="mx-auto flex h-full max-w-7xl items-center">
              <Dialog.Panel className="aspect-video max-h-full w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
                <video
                  ref={videoRef}
                  width={videoWidth}
                  height={videoHeight}
                  loop
                  controls
                  muted
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  )
}
