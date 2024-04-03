import type { SVGProps } from 'react'

export function ExpandRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        d="m12 18l6-6l-6-6M6 18l6-6l-6-6"
      ></path>
    </svg>
  )
}
