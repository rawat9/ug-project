import { Logo } from '@/icons'

export function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="https://dashgen.studio/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Logo className="mr-2 h-5 w-5" />
        </a>
        <span className="block text-center text-sm text-gray-500">
          ©dashgen 2024, All rights reserved.
        </span>
      </div>
    </footer>
  )
}
