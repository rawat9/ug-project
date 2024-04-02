import type { SVGProps } from 'react'

export function Table(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3zM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75V8.5h-15zM10 10h4v4h-4zm-1.5 0v4h-4v-4zm0 5.5v4H6.25a1.75 1.75 0 0 1-1.75-1.75V15.5zm1.5 4v-4h4v4zm5.5-5.5v-4h4v4zm0 1.5h4v2.25a1.75 1.75 0 0 1-1.75 1.75H15.5z"
      ></path>
    </svg>
  )
}
