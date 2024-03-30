import { Button } from '@/icons'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export function Header() {
  return (
    <header className="border-transparent-white fixed left-0 top-0 z-10 w-full backdrop-blur-[12px]">
      <div className="mx-auto flex h-[4.8rem] max-w-[120rem] px-8">
        <Link className="text-md flex items-center" href="/">
          {/* <Logo className="mr-4 h-[1.8rem] w-[1.8rem]" /> Linear */}
          dashcms.
        </Link>

        <div
          className={cn(
            'transition-[visibility] md:visible',
            // hamburgerMenuIsOpen ? 'visible' : 'invisible delay-500',
          )}
        >
          <nav
            className={cn(
              'top-navigation-height bg-background fixed left-0 h-[calc(100vh_-_var(--navigation-height))] w-full overflow-auto transition-opacity duration-500 md:relative md:top-0 md:block md:h-auto md:w-auto md:translate-x-0 md:overflow-hidden md:bg-transparent md:opacity-100 md:transition-none',
              //   hamburgerMenuIsOpen
              //     ? 'translate-x-0 opacity-100'
              'translate-x-[-100vw] opacity-0',
            )}
          >
            <ul
              className={cn(
                '[&_li]:border-grey-dark flex h-full flex-col md:flex-row md:items-center [&_li]:ml-6 [&_li]:border-b md:[&_li]:border-none',
                '[&_a:hover]:text-grey [&_a]:h-navigation-height ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300 md:[&_a]:translate-y-0 md:[&_a]:text-sm [&_a]:md:transition-colors',
                // hamburgerMenuIsOpen && '[&_a]:translate-y-0',
              )}
            >
              <li>
                <Link href="#">Features</Link>
              </li>
              <li>
                <Link href="#">Method</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Customers</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Changelog</Link>
              </li>
              <li className="md:hidden lg:block">
                <Link href="#">Integrations</Link>
              </li>
              <li>
                <Link href="#">Pricing</Link>
              </li>
              <li>
                <Link href="#">Company</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="ml-auto flex h-full items-center">
          <Link className="mr-6 text-sm" href="#">
            Log in
          </Link>
          <Button href="#">Sign up</Button>
        </div>

        <button
          className="ml-6 md:hidden"
          //   onClick={() => setHamburgerMenuIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle menu</span>
          {/* <HamburgerIcon /> */}
        </button>
      </div>
    </header>
  )
}
