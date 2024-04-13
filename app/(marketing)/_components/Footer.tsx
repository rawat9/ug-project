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
          <a href="https://github.com/rawat9/ug-project" target="_blank">
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M7.5.25a7.25 7.25 0 0 0-2.292 14.13c.363.066.495-.158.495-.35c0-.172-.006-.628-.01-1.233c-2.016.438-2.442-.972-2.442-.972c-.33-.838-.805-1.06-.805-1.06c-.658-.45.05-.441.05-.441c.728.051 1.11.747 1.11.747c.647 1.108 1.697.788 2.11.602c.066-.468.254-.788.46-.969c-1.61-.183-3.302-.805-3.302-3.583a2.8 2.8 0 0 1 .747-1.945c-.075-.184-.324-.92.07-1.92c0 0 .61-.194 1.994.744A6.963 6.963 0 0 1 7.5 3.756A6.97 6.97 0 0 1 9.315 4c1.384-.938 1.992-.743 1.992-.743c.396.998.147 1.735.072 1.919c.465.507.745 1.153.745 1.945c0 2.785-1.695 3.398-3.31 3.577c.26.224.492.667.492 1.343c0 .97-.009 1.751-.009 1.989c0 .194.131.42.499.349A7.25 7.25 0 0 0 7.499.25"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  )
}
